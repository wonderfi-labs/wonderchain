import { Provider } from "zksync-ethers";
import { Configuration, NetworkApi } from "./api-client"
import { Configuration as BConfiguration, DefaultApi as BlockscoutApi } from "./blockscout-client"
import { getConfig } from "./config";

export const getApiConfiguration = (chainId: number | string) => {
    const config = getConfig(chainId);
    if (!config) {
        return null
    }

    return new Configuration({
        basePath: config.URLS.WONDER_API,
    });
}

export const getNetworkApi = (chainId: number | string) => {
    const apiConfiguration = getApiConfiguration(chainId);
    if (!apiConfiguration) {
        return null;
    }
    return new NetworkApi(apiConfiguration);
}


export const getBlockscoutApiConfiguration = (chainId: number | string) => {
    const config = getConfig(chainId);
    if (!config) {
        return null
    }

    return new BConfiguration({
        basePath: config.URLS.BLOCKSCOUT,
    });
}

export const getBlockscoutApi = (chainId: number | string) => {
    const apiConfiguration = getBlockscoutApiConfiguration(chainId);
    if (!apiConfiguration) {
        return null;
    }
    return new BlockscoutApi(apiConfiguration);
}