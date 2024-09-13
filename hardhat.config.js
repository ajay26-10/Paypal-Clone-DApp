require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "infura",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545" 
    },
    infura: {
      url: "https://sepolia.infura.io/v3/746b467e0bf9419aab3e73b88e6d0c4f",
      accounts: [process.env.PRIVATEKEY]
    }
  },
  solidity: "0.8.20",
};