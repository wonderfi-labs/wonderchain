export const CONFIG: {
    [key: string]: {
        id: string;
        ADDRESSES: {
            FACTORY?: string;
            FAUCET?: string;
            PAYMASTER?: string;   
            RECORDER?: string; 
        },
        URLS: {
            WONDER_API: string;
            BLOCKSCOUT: string;
            RPC: string;
            EXPLORER: string;
        },
    }
} = {
    '300': {
        id: 'zksync-sepolia',
        ADDRESSES: {
            FACTORY: '0xD0864BA18b2275feB328c096a14f1338df775e69',
            FAUCET: '0xa57e5f45533B9eB122ca1A3667657C273B41535E',
            PAYMASTER: '0x2f4Fa4Beca89930De0F40960527A17804f9195Cf',
            RECORDER: '0x6aAbB8fb9be155F5B9a054C295424ae2c583c970',
        },
        URLS: {
            WONDER_API: 'https://api.wonderchain.org',
            BLOCKSCOUT: 'https://zksync-sepolia.blockscout.com/api/v2',
            RPC: 'https://sepolia.era.zksync.dev',
            EXPLORER: 'https://zksync-sepolia.blockscout.com',
        },
    },
    '324': {
        id: 'zksync-mainnet',
        ADDRESSES: {},
        URLS: {
            WONDER_API: 'https://api.wonderchain.org',
            BLOCKSCOUT: 'https://zksync.blockscout.com/api/v2',
            RPC: 'https://mainnet.era.zksync.io',
            EXPLORER: 'https://zksync.blockscout.com',
        },
    },
    '96371': {
        id: 'wonder-sepolia',
        ADDRESSES: {
            FACTORY: '0xE96Ce8D9382826Bc8C8aCf76158F7D9AC44ABe57',
            FAUCET: '0x0d0A98A3f88d6604d6d8B07bB60a79444C42f4bC',
            PAYMASTER: '0x1cf380DABAFb3a9B2f69017D9d645fBf6D103803',   
            RECORDER: '0xB992469518d03b733959ff027b39773bC4631abC', 
        },
        URLS: {
            WONDER_API: 'https://api.wonderchain.org',
            BLOCKSCOUT: '',
            RPC: 'http://rpc.testnet.wonderchain.org/',
            EXPLORER: 'https://testnet-explorer.wonderchain.org',
        },
    },
};