import { Provider } from "zksync-ethers";
import { Configuration, NetworkApi } from "./api-client"
import { getConfig } from "./config";

export const getApiConfiguration = async (provider: Provider) => {
    const config = await getConfig(provider);
    if (!config) {
        return null
    }

    return new Configuration({
        basePath: config.API.HOST,
    });
}

export const getNetworkApi = async (provider: Provider) => {
    const apiConfiguration = await getApiConfiguration(provider);
    if (!apiConfiguration) {
        return null;
    }
    return new NetworkApi(apiConfiguration);
}