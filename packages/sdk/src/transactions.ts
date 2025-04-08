import { Provider, utils } from "zksync-ethers";
import { EIP712_TYPES, EIP712Signer } from "zksync-ethers/build/signer";
import { getNetworkApi } from "./api";
import { TransactionLike } from "zksync-ethers/build/types";
import { BytesLike } from "ethers";

export type TypedTransactionData = {
    domain: {
        name: string;
        version: string;
        chainId: number;
    },
    types: typeof EIP712_TYPES;
    primaryType: 'Transaction';
    message: any;
}
export const addPaymasterData = async (provider: Provider, input: TransactionLike) => {
    const networkApi = await getNetworkApi(provider);
    if (!networkApi) {
        return null
    }

    const nonce = await provider.getTransactionCount(input.from);
    const network = await provider.getNetwork();
    const chainId = parseInt(network.chainId.toString(), 10);

    const paymasterParams = await networkApi.paymasterParams(
        chainId,
        input.from,
        input.to,
        input.value.toLocaleString(),
        (nonce).toString()
    );

    const tx: TransactionLike = {
        ...input,
        customData: {
            paymasterParams: utils.getPaymasterParams(paymasterParams.data.data.address, {
                type: "General",
                innerInput: paymasterParams.data.data.signature,
            }),
        },
    }

    const fee = await provider.estimateFee({
        from: tx.from,
        to: tx.to as `0x${string}`,
        data: tx.data as `0x${string}`,
        value: tx.value,
        nonce,
        customData: {
            paymasterParams: utils.getPaymasterParams(paymasterParams.data.data.address, {
                type: "General",
                innerInput: paymasterParams.data.data.signature,
            }),
        },
    });

    tx.gasLimit = fee.gasLimit;
    tx.maxFeePerGas = fee.maxFeePerGas;
    tx.maxPriorityFeePerGas = fee.maxFeePerGas ;
    tx.nonce = nonce;
    tx.chainId = chainId;
    return tx;
}

export const txToTypedData = async (provider: Provider, tx: TransactionLike): Promise<TypedTransactionData> => {
    const network = await provider.getNetwork();
    const chainId = parseInt(network.chainId.toString(), 10);
    return {
        domain: {
            name: 'zkSync',
            version: '2',
            chainId,
        },
        types: EIP712_TYPES,
        primaryType: 'Transaction' as 'Transaction',
        message: EIP712Signer.getSignInput(tx),
    };
}

export const addSignature = (tx: TransactionLike, customSignature: BytesLike): TransactionLike => {
    return {
        ...tx,
        customData: {
            ...tx.customData,
            customSignature,
        }
    }
}

export const serialize = (tx: TransactionLike, ): string => {
    return utils.serializeEip712(tx);
}

export const sendTransaction = async (provider: Provider, input: TransactionLike, signTypedData: (data: any) => Promise<BytesLike>): Promise<TransactionLike>=> {
    const tx = await addPaymasterData(provider, input);
    if (!tx) {
        return null
    }

    const signature = await signTypedData(await txToTypedData(provider, tx));

    const signedTx = addSignature(tx, signature);

    const resp = await provider.broadcastTransaction(serialize(signedTx));
    return resp;
}