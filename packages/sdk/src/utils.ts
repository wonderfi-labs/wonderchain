import { ContractRunner } from "ethers"
import { Faucet__factory } from "./contracts"
import { CONTRACTS } from "./constants";

export const getFactory = async (runner: ContractRunner) => {
    if (!runner?.provider) {
        return null
    }
    const network = await runner.provider.getNetwork();
    const contracts = CONTRACTS[network.chainId.toString()];
    if (!contracts) {
        return null
    }

    return Faucet__factory.connect(contracts.FACTORY, runner);
}