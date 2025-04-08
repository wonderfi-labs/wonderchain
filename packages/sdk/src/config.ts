import { Provider } from "zksync-ethers";
import { CONFIG } from "./constants";

export const getConfig = async (provider: Provider) => {
        if (!provider) {
            return null
        }
        const network = await provider.getNetwork();
        const config = CONFIG[network.chainId.toString()];
        if (!config) {
            return null
        }
        return config;
    
}