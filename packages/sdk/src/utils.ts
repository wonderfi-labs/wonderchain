import { Factory__factory, Faucet__factory, Paymaster__factory } from "./contracts"
import { Provider, utils } from "zksync-ethers";
import { EIP712_TYPES, EIP712Signer } from "zksync-ethers/build/signer";
import { getConfig } from "./config";
import { getNetworkApi } from "./api";
import { TransactionLike } from "zksync-ethers/build/types";
import { BytesLike } from "ethers";

export const getFactory = async (provider: Provider) => {
    const config = await getConfig(provider);
    if (!config) {
        return null
    }

    return Factory__factory.connect(config.ADDRESSES.FACTORY, provider);
}

export const getFaucet = async (provider: Provider) => {
    const config = await getConfig(provider);
    if (!config) {
        return null
    }

    return Faucet__factory.connect(config.ADDRESSES.FAUCET, provider);
}

export const getPaymaster = async (provider: Provider) => {
    const config = await getConfig(provider);
    if (!config) {
        return null
    }
    return Paymaster__factory.connect(config.ADDRESSES.PAYMASTER, provider);
}

export const addPaymasterData = async (provider: Provider, input: {
    from: string;
    to: string;
    data: string;
    value: string;
}) => {
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
        input.value,
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

export const txToTypedData = async (provider: Provider, tx: TransactionLike) => {
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

export const addSignatureAndSerialize = async (tx: TransactionLike, customSignature: BytesLike) => {
    return utils.serializeEip712({
        ...tx,
        customData: {
            ...tx.customData,
            customSignature,
        }
    })
}