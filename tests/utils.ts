import hre from "hardhat";
import { CompileFailedError, CompileResult, compileSourceString } from "solc-typed-ast";


/** @description compile solidity source code */
async function compileSource(body: string) {
    let result: CompileResult;

    try {
        result = await compileSourceString(
            "test.sol",
            `contract C { ${body} }`,
            "0.8.0",
        );
    } catch (e: any) {
        if (e instanceof CompileFailedError) {
            console.error("Compile errors encountered:");
            for (const failure of e.failures) {
                console.error(`Solc ${failure.compilerVersion}:`);

                for (const error of failure.errors) {
                    console.error(error);
                }
            }
        } else {
            console.error(e.message);
        }
        throw e;
    }
    let data = result.data.contracts["test.sol"];
    let abi: any[] = data.C.abi;
    let bytecode: string = data.C.evm.bytecode.object;
    return { abi, bytecode };
}


/** @description deploy solidity source code */
export async function deploySource(body: string) {    
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const { abi, bytecode } = await compileSource(body);
    const Contract = await hre.ethers.getContractFactory(abi, bytecode);
    const contract = await Contract.deploy();
    return { contract, owner, otherAccount };
}
