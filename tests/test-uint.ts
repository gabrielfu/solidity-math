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
            function func(uint256 a, uint256 b) public pure returns (uint256 r) { r = a + b; }
            function funcUnchecked(uint256 a, uint256 b) public pure returns (uint256 r) { unchecked { r = a + b; } }
        `;
        const promise = deploySource(body);        

        it("should add numbers", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).add(solidity.uint256(b)).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "12345";
            const b = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).add(solidity.uint256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "12345";
            const b = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => solidity.uint256(a).add(solidity.uint256(b)).toString(),
            )
        });
    });

    describe("sub()", function () {
        const body = `
            function func(uint256 a, uint256 b) public pure returns (uint256 r) { r = a - b; }
            function funcUnchecked(uint256 a, uint256 b) public pure returns (uint256 r) { unchecked { r = a - b; } }
        `;
        const promise = deploySource(body);        

        it("should subtract numbers", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).sub(solidity.uint256(b)).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "12345";
            const b = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).sub(solidity.uint256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "12345";
            const b = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => solidity.uint256(a).sub(solidity.uint256(b)).toString(),
            )
        });
    });

    describe("mul()", function () {
        const body = `
            function func(uint256 a, uint256 b) public pure returns (uint256 r) { r = a * b; }
            function funcUnchecked(uint256 a, uint256 b) public pure returns (uint256 r) { unchecked { r = a * b; } }
        `;
        const promise = deploySource(body);        

        it("should multiply numbers", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).mul(solidity.uint256(b)).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "12345678901234567890";
            const b = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).mul(solidity.uint256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "12345678901234567890";
            const b = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => solidity.uint256(a).mul(solidity.uint256(b)).toString(),
            )
        });
    });

    describe("div()", function () {
        const body = `
            function func(uint256 a, uint256 b) public pure returns (uint256 r) { r = a / b; }
            function funcUnchecked(uint256 a, uint256 b) public pure returns (uint256 r) { unchecked { r = a / b; } }
        `;
        const promise = deploySource(body);        

        it("should divide numbers", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).div(solidity.uint256(b)).toString(),
            )
        });
    });

    describe("mod()", function () {
        const body = `
            function func(uint256 a, uint256 b) public pure returns (uint256 r) { r = a % b; }
            function funcUnchecked(uint256 a, uint256 b) public pure returns (uint256 r) { unchecked { r = a % b; } }
        `;
        const promise = deploySource(body);        

        it("should modulo numbers", async function () {
            const a = "205";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).mod(solidity.uint256(b)).toString(),
            )
        });
    });

    describe("pow()", function () {
        const body = `
            function func(uint256 a, uint256 b) public pure returns (uint256 r) { r = a ** b; }
            function funcUnchecked(uint256 a, uint256 b) public pure returns (uint256 r) { unchecked { r = a ** b; } }
        `;
        const promise = deploySource(body);        

        it("should raise numbers to power", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).pow(solidity.uint256(b)).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const b = "16";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.func(a, b),
                () => solidity.uint256(a).pow(solidity.uint256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            const b = "16";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => solidity.uint256(a).pow(solidity.uint256(b)).toString(),
            )
        });
    });
});

