import { expect } from "chai";
import { solidity } from "..";
import { deploySource, testMethod, testRevertMethod, testUncheckedMethod } from "./utils";

describe("uint256", function () {
    describe("min() & max()", function () {
        const body = `
            function min() public pure returns (uint256) { return type(uint256).min; }
            function max() public pure returns (uint256) { return type(uint256).max; }
        `;
        const promise = deploySource(body);

        it("should have the correct min()", async function () {
            const { contract } = await promise;
            expect(await contract.min()).to.equal(solidity.Uint256.min().toString());
        });

        it("should have the correct max()", async function () {
            const { contract } = await promise;
            expect(await contract.max()).to.equal(solidity.Uint256.max().toString());
        });
    });

    describe("add()", function () {
        const body = `
            function add(uint256 a, uint256 b) public pure returns (uint256 r) { r = a + b; }
            function addUnchecked(uint256 a, uint256 b) public pure returns (uint256 r) { unchecked { r = a + b; } }
        `;
        const promise = deploySource(body);        

        it("should add numbers", async function () {
            const a = "10";
            const b = "200";
            const { contract } = await promise;
            testMethod(
                async () => contract.add(a, b),
                () => solidity.uint256(a).add(solidity.uint256(b)).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const b = "12345";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.add(a, b),
                () => solidity.uint256(a).add(solidity.uint256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const b = "12345";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.addUnchecked(a, b),
                () => solidity.uint256(a).add(solidity.uint256(b)).toString(),
            )
        });
    });
});

