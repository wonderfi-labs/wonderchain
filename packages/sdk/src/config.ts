import { CONFIG } from "./constants";

export const getConfig = (chainId: string | number) => {
        if (!chainId) {
            return null
        }
        const config = CONFIG[chainId.toString()];
        if (!config) {
            return null
        }
        return config;
    
}