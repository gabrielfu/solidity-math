import { expect } from "chai";
import SM from "..";

describe("restrictions", function () {
    describe("add()", function () {
        it("should not accept different signedness", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint256(a).add(SM.int256(b))
            ).to.throw();
        });
        it("should accept a smaller type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                SM.uint256(a).iadd(SM.uint64(b)).toString()
            ).to.eq("210");
        });
        it("should not accept a larger type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint64(a).iadd(SM.uint256(b))
            ).to.throw();
        });
    });
    describe("sub()", function () {
        it("should not accept different signedness", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint256(a).sub(SM.int256(b))
            ).to.throw();
        });
        it("should accept a smaller type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                SM.uint256(a).isub(SM.uint64(b)).toString()
            ).to.eq("190");
        });
        it("should not accept a larger type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint64(a).isub(SM.uint256(b))
            ).to.throw();
        });
    });
    describe("mul()", function () {
        it("should not accept different signedness", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint256(a).mul(SM.int256(b))
            ).to.throw();
        });
        it("should accept a smaller type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                SM.uint256(a).imul(SM.uint64(b)).toString()
            ).to.eq("2000");
        });
        it("should not accept a larger type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint64(a).imul(SM.uint256(b))
            ).to.throw();
        });
    });
    describe("div()", function () {
        it("should not accept different signedness", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint256(a).div(SM.int256(b))
            ).to.throw();
        });
        it("should accept a smaller type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                SM.uint256(a).idiv(SM.uint64(b)).toString()
            ).to.eq("20");
        });
        it("should not accept a larger type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint64(a).idiv(SM.uint256(b))
            ).to.throw();
        });
    });
    describe("mod()", function () {
        it("should not accept different signedness", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint256(a).mod(SM.int256(b))
            ).to.throw();
        });
        it("should accept a smaller type in-place", async function () {
            const a = "207";
            const b = "10";
            expect(
                SM.uint256(a).imod(SM.uint64(b)).toString()
            ).to.eq("7");
        });
        it("should not accept a larger type in-place", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint64(a).imod(SM.uint256(b))
            ).to.throw();
        });
    });
    describe("pow()", function () {
        it("should not accept unsigned value", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.int256(a).pow(SM.int256(b))
            ).to.throw();
        });
        it("should not accept negative values", async function () {
            const a = "200";
            const b = "-10";
            expect(
                () => SM.int256(a).pow(b)
            ).to.throw();
        });
        it("should accept positive values", async function () {
            const a = "12";
            const b = "3";
            expect(SM.int256(a).pow(b).toString()).to.eq("1728");
        });
    });
    describe("addmod()", function () {
        it("should not accept different signedness", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint256(a).addmod(SM.uint256(a), SM.int256(b))
            ).to.throw();
            expect(
                () => SM.uint256(a).addmod(SM.int256(a), SM.uint256(b))
            ).to.throw();
        });
    });
    describe("mulmod()", function () {
        it("should not accept different signedness", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.uint256(a).mulmod(SM.uint256(a), SM.int256(b))
            ).to.throw();
            expect(
                () => SM.uint256(a).mulmod(SM.int256(a), SM.uint256(b))
            ).to.throw();
        });
    });
    describe("shln()", function () {
        it("should not accept unsigned value", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.int256(a).shln(SM.int256(b))
            ).to.throw();
        });
        it("should not accept negative values", async function () {
            const a = "200";
            const b = "-10";
            expect(
                () => SM.int256(a).shln(b)
            ).to.throw();
        });
        it("should accept positive values", async function () {
            const a = "200";
            const b = "10";
            expect(SM.int256(a).shln(b).toString()).to.eq("204800");
        });
    });
    describe("shrn()", function () {
        it("should not accept unsigned value", async function () {
            const a = "200";
            const b = "10";
            expect(
                () => SM.int256(a).shrn(SM.int256(b))
            ).to.throw();
        });
        it("should not accept negative values", async function () {
            const a = "200";
            const b = "-10";
            expect(
                () => SM.int256(a).shrn(b)
            ).to.throw();
        });
        it("should accept positive values", async function () {
            const a = "204800";
            const b = "10";
            expect(SM.int256(a).shrn(b).toString()).to.eq("200");
        });
    });
});
