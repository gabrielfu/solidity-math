import BN from "bn.js";
import { expect } from "chai";
import SM from "..";
import { deploySource, testMethod, testRevertMethod, testUncheckedMethod } from "./utils";

describe("int256", function () {
    describe("constructor", function () {
        it("should accept integer", async function () {
            const num = Math.pow(2, 53) - 1;
            expect(SM.int256(num).toString()).to.equal(num.toString());
        });

        it("should accept max safe integer", async function () {
            const num = Math.pow(2, 53) - 1;
            expect(SM.int256(num).toString()).to.equal(num.toString());
        });

        it("should not accept unsafe integer", async function () {
            const num = Math.pow(2, 53);
            expect(() => SM.int256(num)).to.throw();
        });

        it("should accept string", async function () {
            const num = "587321402409830431832093";
            expect(SM.int256(num).toString()).to.equal(num.toString());
        });

        it("should accept hex", async function () {
            const num = 0x12345;
            expect(SM.int256(num).toString()).to.equal("74565");
        });

        it("should accept BN", async function () {
            const num = new BN(12345);
            expect(SM.int256(num).toString()).to.equal("12345");
        });

        it("should not accept overflowed string", async function () {
            const num = "57896044618658097711785492504343953926634992332820282019728792003956564819968";
            expect(() => SM.int256(num)).to.throw();
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
            expect(await contract.min()).to.equal(SM.Int256.min().toString());
        });

        it("should have the correct max()", async function () {
            const { contract } = await promise;
            expect(await contract.max()).to.equal(SM.Int256.max().toString());
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
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).add(SM.int256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).add(b).toString(),
            );
        });
        it("should overflow", async function () {
            const a = "12345";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testRevertMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).add(SM.int256(b)).toString(),
            );
        });
        it("should wraparound unchecked", async function () {
            const a = "12345";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => SM.int256(a).add(SM.int256(b)).toString(),
            );
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
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).sub(SM.int256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).sub(b).toString(),
            );
        });
        it("should overflow", async function () {
            const a = "-10";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testRevertMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).sub(SM.int256(b)).toString(),
            );
        });
        it("should wraparound unchecked", async function () {
            const a = "-10";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => SM.int256(a).sub(SM.int256(b)).toString(),
            );
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
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).mul(SM.int256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).mul(b).toString(),
            );
        });
        it("should overflow", async function () {
            const a = "12345678901234567890";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testRevertMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).mul(SM.int256(b)).toString(),
            );
        });
        it("should wraparound unchecked", async function () {
            const a = "12345678901234567890";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => SM.int256(a).mul(SM.int256(b)).toString(),
            );
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
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).div(SM.int256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).div(b).toString(),
            );
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
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).mod(SM.int256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "205";
            const b = 10;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).mod(b).toString(),
            );
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
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).pow(SM.uint256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "200";
            const b = 10;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).pow(b).toString(),
            );
        });
        it("should overflow", async function () {
            const a = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const b = "16";
            const { contract } = await promise;
            await testRevertMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).pow(SM.uint256(b)).toString(),
            );
        });
        it("should wraparound unchecked", async function () {
            const a = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const b = "16";
            const { contract } = await promise;
            await testUncheckedMethod(
                async () => contract.funcUnchecked(a, b),
                () => SM.int256(a).pow(SM.uint256(b)).toString(),
            );
        });
        it("should not accept signed right operand", async function () {
            const a = "200";
            const b = "10";
            expect(() => SM.int256(a).pow(SM.int256(b))).to.throw();
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
            await testUncheckedMethod(
                async () => contract.func(a, b, c),
                () => SM.int256(a).addmod(SM.int256(b), SM.int256(c)).toString(),
            );
        });
        it("should throw error outside of unchecked mode", async function () {
            const a = "205";
            const b = "199";
            const c = "10";
            expect(() => SM.int256(a).addmod(SM.int256(b), SM.int256(c))).to.throw();
        });
        it("should addmod big numbers", async function () {
            const a = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819966";
            const c = "100";
            const { contract } = await promise;
            await testUncheckedMethod(
                async () => contract.func(a, b, c),
                () => SM.int256(a).addmod(SM.int256(b), SM.int256(c)).toString(),
            );
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
            await testUncheckedMethod(
                async () => contract.func(a, b, c),
                () => SM.int256(a).mulmod(SM.int256(b), SM.int256(c)).toString(),
            );
        });
        it("should throw error outside of unchecked mode", async function () {
            const a = "205";
            const b = "199";
            const c = "10";
            expect(() => SM.int256(a).mulmod(SM.int256(b), SM.int256(c))).to.throw();
        });
        it("should mulmod big numbers", async function () {
            const a = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819966";
            const c = "100";
            const { contract } = await promise;
            await testUncheckedMethod(
                async () => contract.func(a, b, c),
                () => SM.int256(a).mulmod(SM.int256(b), SM.int256(c)).toString(),
            );
        });
    });

    describe("shln()", function () {
        const body = `
            function func(int256 a, uint256 b) public pure returns (int256 r) { r = a << b; }
        `;
        const promise = deploySource(body);

        it("should left shift for positive value", async function () {
            const a = "204812";
            const b = "10";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).shln(SM.uint256(b)).toString(),
            );
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).ishln(SM.uint256(b)).toString(),
            );
        });
        it("should left shift for negative value", async function () {
            const a = "-204812";
            const b = "10";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).shln(SM.uint256(b)).toString(),
            );
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).ishln(SM.uint256(b)).toString(),
            );
        });
        it("should not accept signed right operand", async function () {
            const a = "204812";
            const b = "10";
            expect(
                () => SM.int256(a).shln(SM.int256(b))
            ).to.throw();
        });
        it("should not accept negative right operand", async function () {
            const a = "204812";
            const b = -10;
            expect(
                () => SM.int256(a).shln(b)
            ).to.throw();
        });
    });

    describe("shrn()", function () {
        const body = `
            function func(int256 a, uint256 b) public pure returns (int256 r) { r = a >> b; }
        `;
        const promise = deploySource(body);

        it("should right shift for positive value", async function () {
            const a = "204812";
            const b = "10";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).shrn(SM.uint256(b)).toString(),
            );
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).ishrn(SM.uint256(b)).toString(),
            );
        });
        it("should right shift for negative value", async function () {
            const a = "-204812";
            const b = "10";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).shrn(SM.uint256(b)).toString(),
            );
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).ishrn(SM.uint256(b)).toString(),
            );
        });
        it("should not accept signed right operand", async function () {
            const a = "204812";
            const b = "10";
            expect(
                () => SM.int256(a).shrn(SM.int256(b))
            ).to.throw();
        });
        it("should not accept negative right operand", async function () {
            const a = "204812";
            const b = -10;
            expect(
                () => SM.int256(a).shrn(b)
            ).to.throw();
        });
    });

    describe("and()", function () {
        const body = `
            function func(int256 a, int256 b) public pure returns (int256 r) { r = a & b; }
        `;
        const promise = deploySource(body);

        it("should and numbers", async function () {
            const a = "140321709321";
            const b = "8532174021890421";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).and(SM.int256(b)).toString(),
            );
        });
        it("should and negative numbers", async function () {
            const a = "140321709321";
            const b = "-8532174021890421";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).and(SM.int256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "140321709321";
            const b = 8532174021890421;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).and(b).toString(),
            );
        });
        it("should not overflow", async function () {
            const a = "12345678901234567890";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).and(b).toString(),
            );
        });
    });

    describe("or()", function () {
        const body = `
            function func(int256 a, int256 b) public pure returns (int256 r) { r = a | b; }
        `;
        const promise = deploySource(body);

        it("should or numbers", async function () {
            const a = "140321709321";
            const b = "8532174021890421";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).or(SM.int256(b)).toString(),
            );
        });
        it("should or negative numbers", async function () {
            const a = "140321709321";
            const b = "-8532174021890421";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).or(SM.int256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "140321709321";
            const b = 8532174021890421;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).or(b).toString(),
            );
        });
        it("should not overflow", async function () {
            const a = "12345678901234567890";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).or(b).toString(),
            );
        });
    });

    describe("xor()", function () {
        const body = `
            function func(int256 a, int256 b) public pure returns (int256 r) { r = a ^ b; }
        `;
        const promise = deploySource(body);

        it("should xor numbers", async function () {
            const a = "140321709321";
            const b = "8532174021890421";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).xor(SM.int256(b)).toString(),
            );
        });
        it("should xor negative numbers", async function () {
            const a = "140321709321";
            const b = "-8532174021890421";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).xor(SM.int256(b)).toString(),
            );
        });
        it("should accept number as right operand", async function () {
            const a = "140321709321";
            const b = 8532174021890421;
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).xor(b).toString(),
            );
        });
        it("should not overflow", async function () {
            const a = "12345678901234567890";
            const b = "57896044618658097711785492504343953926634992332820282019728792003956564819967";
            const { contract } = await promise;
            await testMethod(
                async () => contract.func(a, b),
                () => SM.int256(a).xor(b).toString(),
            );
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
            await testUncheckedMethod(
                async () => { return (await contract.func(a, b, c)).toString() },
                () => SM.int16(a).addmod(SM.int16(b), SM.int256(c)).toString(),
            );
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
            await testUncheckedMethod(
                async () => { return (await contract.func(a, b, c)).toString() },
                () => SM.int16(a).mulmod(SM.int16(b), SM.int256(c)).toString(),
            );
        });
    });
});
