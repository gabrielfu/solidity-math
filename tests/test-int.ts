import BN from "bn.js";
import { expect } from "chai";
import { solidity } from "..";
import { deploySource, testMethod, testRevertMethod, testUncheckedMethod } from "./utils";

describe("int256", function () {
    describe("constructor", function () {
        it("should accept integer", async function () {
            const num = Math.pow(2, 53) - 1;
            expect(solidity.int256(num).toString()).to.equal(num.toString());
        });

        it("should accept max safe integer", async function () {
            const num = Math.pow(2, 53) - 1;
            expect(solidity.int256(num).toString()).to.equal(num.toString());
        });

        it("should not accept unsafe integer", async function () {
            const num = Math.pow(2, 53);
            expect(() => solidity.int256(num)).to.throw();
        });

        it("should accept string", async function () {
            const num = "587321402409830431832093";
            expect(solidity.int256(num).toString()).to.equal(num.toString());
        });

        it("should accept hex", async function () {
            const num = 0x12345;
            expect(solidity.int256(num).toString()).to.equal("74565");
        });

        it("should accept BN", async function () {
            const num = new BN(12345);
            expect(solidity.int256(num).toString()).to.equal("12345");
        });

        it("should not accept overflowed string", async function () {
            const num = "57896044618658097711785492504343953926634992332820282019728792003956564819968";
            expect(() => solidity.int256(num)).to.throw();
        });
    });

    describe("min() & max()", function () {
        const body = `
            function min() public pure returns (int256) { return type(int256).min; }
            function max() public pure returns (int256) { return type(int256).max; }
        `;
        const promise = deploySource(body);

        it("should have the correct min()", async function () {
            const { contract } = await promise;
            expect(await contract.min()).to.equal(solidity.Int256.min().toString());
        });

        it("should have the correct max()", async function () {
            const { contract } = await promise;
            expect(await contract.max()).to.equal(solidity.Int256.max().toString());
        });
    });

    describe("add()", function () {
        const body = `
            function func(int256 a, int256 b) public pure returns (int256 r) { r = a + b; }
            function funcUnchecked(int256 a, int256 b) public pure returns (int256 r) { unchecked { r = a + b; } }
        `;
        const promise = deploySource(body);

        it("should add numbers", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).add(solidity.int256(b)).toString(),
            )
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).add(b).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "12345";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).add(solidity.int256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "12345";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => solidity.int256(a).add(solidity.int256(b)).toString(),
            )
        });
    });

    describe("sub()", function () {
        const body = `
            function func(int256 a, int256 b) public pure returns (int256 r) { r = a - b; }
            function funcUnchecked(int256 a, int256 b) public pure returns (int256 r) { unchecked { r = a - b; } }
        `;
        const promise = deploySource(body);

        it("should subtract numbers", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).sub(solidity.int256(b)).toString(),
            )
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).sub(b).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "-10";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).sub(solidity.int256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "-10";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => solidity.int256(a).sub(solidity.int256(b)).toString(),
            )
        });
    });

    describe("mul()", function () {
        const body = `
            function func(int256 a, int256 b) public pure returns (int256 r) { r = a * b; }
            function funcUnchecked(int256 a, int256 b) public pure returns (int256 r) { unchecked { r = a * b; } }
        `;
        const promise = deploySource(body);

        it("should multiply numbers", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).mul(solidity.int256(b)).toString(),
            )
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).mul(b).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "12345678901234567890";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).mul(solidity.int256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "12345678901234567890";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => solidity.int256(a).mul(solidity.int256(b)).toString(),
            )
        });
    });

    describe("div()", function () {
        const body = `
            function func(int256 a, int256 b) public pure returns (int256 r) { r = a / b; }
            function funcUnchecked(int256 a, int256 b) public pure returns (int256 r) { unchecked { r = a / b; } }
        `;
        const promise = deploySource(body);

        it("should divide numbers", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).div(solidity.int256(b)).toString(),
            )
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).div(b).toString(),
            )
        });
    });

    describe("mod()", function () {
        const body = `
            function func(int256 a, int256 b) public pure returns (int256 r) { r = a % b; }
            function funcUnchecked(int256 a, int256 b) public pure returns (int256 r) { unchecked { r = a % b; } }
        `;
        const promise = deploySource(body);

        it("should modulo numbers", async function () {
            const a = "205";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).mod(solidity.int256(b)).toString(),
            )
        });
        it("should accept number as right operand", async function () {
            const a = "205";
            const b = 10;
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).mod(b).toString(),
            )
        });
    });

    describe("pow()", function () {
        const body = `
            function func(int256 a, uint256 b) public pure returns (int256 r) { r = a ** b; }
            function funcUnchecked(int256 a, uint256 b) public pure returns (int256 r) { unchecked { r = a ** b; } }
        `;
        const promise = deploySource(body);

        it("should raise numbers to power", async function () {
            const a = "200";
            const b = "10";
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).pow(solidity.uint256(b)).toString(),
            )
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            testMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).pow(b).toString(),
            )
        });
        it("should overflow", async function () {
            const a = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const b = "16";
            const { contract } = await promise;
            testRevertMethod(
                async () => contract.func(a, b),
                () => solidity.int256(a).pow(solidity.uint256(b)).toString(),
            )
        });
        it("should wraparound unchecked", async function () {
            const a = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const b = "16";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => solidity.int256(a).pow(solidity.uint256(b)).toString(),
            )
        });
        it("should not accept signed right operand", async function () {
            const a = "200";
            const b = "10";
            expect(() => solidity.int256(a).pow(solidity.int256(b))).to.throw();
        });
    });

    describe("addmod()", function () {
        const body = `
            function func(int256 a, int256 b, int256 c) public pure returns (int256 r) { assembly { r := addmod(a, b, c) } }
        `;
        const promise = deploySource(body);

        it("should addmod numbers", async function () {
            const a = "205";
            const b = "199";
            const c = "10";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.func(a, b, c),
                () => solidity.int256(a).addmod(solidity.int256(b), solidity.int256(c)).toString(),
            )
        });
        it("should throw error outside of unchecked mode", async function () {
            const a = "205";
            const b = "199";
            const c = "10";
            expect(() => solidity.int256(a).addmod(solidity.int256(b), solidity.int256(c))).to.throw();
        });
        it("should addmod big numbers", async function () {
            const a = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819966";
            const c = "100";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.func(a, b, c),
                () => solidity.int256(a).addmod(solidity.int256(b), solidity.int256(c)).toString(),
            )
        });
    });

    describe("mulmod()", function () {
        const body = `
            function func(int256 a, int256 b, int256 c) public pure returns (int256 r) { assembly { r := mulmod(a, b, c) } }
        `;
        const promise = deploySource(body);

        it("should mulmod numbers", async function () {
            const a = "205";
            const b = "199";
            const c = "10";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.func(a, b, c),
                () => solidity.int256(a).mulmod(solidity.int256(b), solidity.int256(c)).toString(),
            )
        });
        it("should throw error outside of unchecked mode", async function () {
            const a = "205";
            const b = "199";
            const c = "10";
            expect(() => solidity.int256(a).mulmod(solidity.int256(b), solidity.int256(c))).to.throw();
        });
        it("should mulmod big numbers", async function () {
            const a = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819966";
            const c = "100";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => contract.func(a, b, c),
                () => solidity.int256(a).mulmod(solidity.int256(b), solidity.int256(c)).toString(),
            )
        });
    });
});


describe("int16", function () {
    describe("addmod()", function () {
        const body = `
            function func(int16 a, int16 b, int256 c) public pure returns (int16 r) { assembly { r := addmod(a, b, c) } }
        `;
        const promise = deploySource(body);
        it("should wraparound", async function () {
            const a = "32767";
            const b = "32767";
            const c = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => { return (await contract.func(a, b, c)).toString() },
                () => solidity.int16(a).addmod(solidity.int16(b), solidity.int256(c)).toString(),
            )
        });
    });
    describe("mulmod()", function () {
        const body = `
            function func(int16 a, int16 b, int256 c) public pure returns (int16 r) { assembly { r := mulmod(a, b, c) } }
        `;
        const promise = deploySource(body);
        it("should wraparound", async function () {
            const a = "32767";
            const b = "32767";
            const c = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            testUncheckedMethod(
                async () => { return (await contract.func(a, b, c)).toString() },
                () => solidity.int16(a).mulmod(solidity.int16(b), solidity.int256(c)).toString(),
            )
        });
    });
});