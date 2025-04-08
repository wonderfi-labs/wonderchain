import { ContractRunner } from "ethers"
import { Factory__factory, Faucet__factory, Paymaster__factory } from "./contracts"
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

    return Factory__factory.connect(contracts.FACTORY, runner);
}

export const getFaucet = async (runner: ContractRunner) => {
    if (!runner?.provider) {
        return null
    }
    const network = await runner.provider.getNetwork();
    const contracts = CONTRACTS[network.chainId.toString()];
    if (!contracts) {
        return null
    }

    return Faucet__factory.connect(contracts.FAUCET, runner);
}

export const getPaymaster = async (runner: ContractRunner) => {
    if (!runner?.provider) {
        return null
    }
    const network = await runner.provider.getNetwork();
    const contracts = CONTRACTS[network.chainId.toString()];
    if (!contracts) {
        return null
    }

    return Paymaster__factory.connect(contracts.PAYMASTER, runner);
}