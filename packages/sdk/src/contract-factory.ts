import { Erc20__factory, Factory__factory, Faucet__factory, Paymaster__factory, Recorder__factory } from "./contracts"
import { Provider } from "zksync-ethers";
import { getConfig } from "./config";

export const getFactory = async (provider: Provider) => {
    const network = await provider.getNetwork();
    const config = await getConfig(network.chainId.toString());
    if (!config) {
        return null
    }
    if (!config.ADDRESSES.FACTORY) {
        return null
    }
    return Factory__factory.connect(config.ADDRESSES.FACTORY, provider);
}

export const getFaucet = async (provider: Provider) => {
    const network = await provider.getNetwork();
    const config = await getConfig(network.chainId.toString());
    if (!config) {
        return null
    }
    if (!config.ADDRESSES.FAUCET) {
        return null
    }
    return Faucet__factory.connect(config.ADDRESSES.FAUCET, provider);
}

export const getPaymaster = async (provider: Provider) => {
    const network = await provider.getNetwork();
    const config = await getConfig(network.chainId.toString());
    if (!config) {
        return null
    }
    if (!config.ADDRESSES.PAYMASTER) {
        return null
    }
    return Recorder__factory.connect(config.ADDRESSES.PAYMASTER, provider);
}

export const getRecorder = async (provider: Provider) => {
    const network = await provider.getNetwork();
    const config = await getConfig(network.chainId.toString());
    if (!config) {
        return null
    }
    if (!config.ADDRESSES.RECORDER) {
        return null
    }
    return Paymaster__factory.connect(config.ADDRESSES.RECORDER, provider);
}

export const getERC20 = async (provider: Provider, contractAddress: string) => {
    return Erc20__factory.connect(contractAddress, provider);
}