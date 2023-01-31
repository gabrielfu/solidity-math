import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 20
            },
            outputSelection: {
                "*": {
                    "*": ["storageLayout"]
                }
            }
        }
    },
    paths: {
        sources: "./tests/contracts",
        tests: "./tests/scripts",
    }
};

export default config;