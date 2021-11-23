const HDWalletProvider = require("truffle-hdwallet-provider-privkey");

var privateKeys = [
  "EBE1978D0906698B98F20E26CD861C72431CC6EE67E636AB15EDE06970556AB7",
  "849E0993B206CEA8DA2CEEECD727D0B65DB397C4778164CC7A2C59C79560E8B8",
];

module.exports = {
  networks: {

    testnet: {
       skipDryRun: true,
       provider: () => new HDWalletProvider(privateKeys, "https://rpc3.bakerloo.autonity.network:8545"),
       network_id: "*", // Match any network id,
       gasPrice: 10000000000
    },
    devnet: {
       skipDryRun: true,
       provider: () => new HDWalletProvider("EBE1978D0906698B98F20E26CD861C72431CC6EE67E636AB15EDE06970556AB7", "https://rpc.devnet.clearmatics.network:8545"),
       network_id: "*", // Match any network id,
       gasPrice: 10000000000
    },
    development: {
      host: "127.0.0.1",
      port: "7545",
      network_id: "*" // match any network id
    }

  },

  compilers: {
          solc: {
            version: "0.8.3",
            optimizer: {
              enabled: false, // test coverage won't work otherwise
              runs: 200
            },
          },
          },
        plugins: ["solidity-coverage"]
};
