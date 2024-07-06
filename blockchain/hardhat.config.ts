import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    "Rootstock-Testnet": {
      url: process.env.RPC_URL,
      chainId: 31,
      accounts: [process.env.PRIVATE_KEY || ""],
    }
  }
};

export default config;
