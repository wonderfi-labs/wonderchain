import { Erc20__factory, Factory__factory, Faucet__factory, Paymaster__factory } from "./contracts"
import { Provider } from "zksync-ethers";
import { getConfig } from "./config";

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

export const getERC20 = async (provider: Provider, contractAddress: string) => {
    return Erc20__factory.connect(contractAddress, provider);
}