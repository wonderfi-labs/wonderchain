# @wonderchain/api-client

![npm](https://img.shields.io/npm/v/@wonderchain/api-client)
![license](https://img.shields.io/npm/l/@wonderchain/api-client)
![downloads](https://img.shields.io/npm/dt/@wonderchain/api-client)

## Description
Use the api client to generate

## Installation
```sh
npm install @wonderchain/sdk zksync-ethers
```
Or with yarn:
```sh
yarn add @wonderchain/sdk zksync-ethers
```

## Usage
```js

import { Configuration, NetworkApi, Faucetfactory } from "@layer2/api-client";
import { Provider, utils, Wallet } from "zksync-ethers";

const apiHost = 'https://api.wonderchain.org';

// testnet config
const chainId = 96371;
const rpcUrl = 'https://rpc.testnet.wonderchain.org';

const provider = new Provider(rpcUrl);

// or use a browser wallet
const wallet = new Wallet(PRIVATE_KEY, provider);

const config = new Configuration({
    basePath: apiHost,
});
const networkApi = new NetworkApi(config);

// using faucet (testnet only)
const faucetParams = await networkApi.faucetParams(chainId, wallet.address);
const paymasterParams = await networkApi.paymasterParams(
    chainId,
    wallet.address,
    faucetParams.data.data.address,
    "0", // replace with value for 
    (await wallet.getNonce()).toString()
);


// example abi to connect
const faucet = Faucetfactory.connect(faucetParams.data.data.address, provider);

// hydrate the transaction with paymaster parameters
const data = await faucet.drip.populateTransaction(faucetParams.data.data.signature, {
    type: utils.EIP712_TX_TYPE,
    from: wallet.address,
    chainId: (await provider.getNetwork()).chainId,
    customData: {
    paymasterParams: utils.getPaymasterParams(paymasterParams.data.data.address, {
        type: "General",
        innerInput: paymasterParams.data.data.signature,
    }),
    },
});

// broadcast the transaction
const tx = await wallet.sendTransaction(data);
await tx.wait();

```


## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors
- **Kartik Bajaj** - [GitHub Profile](https://github.com/kb-wonderfi)

## Acknowledgments
- Mention anyone who helped or inspired the project.

