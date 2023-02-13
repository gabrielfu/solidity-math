import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.17",
        settings: {
            optimizer: {
                enabled: false,
            },
            outputSelection: {
                "*": {
                    "*": ["evm.bytecode", "abi"],
                },
            },
        },
    },
    paths: {
        tests: "./tests",
    },
};

export default config;