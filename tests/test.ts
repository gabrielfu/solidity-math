import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { Contract } from "ethers";
import BN from "bn.js";

import { uint256, int256 } from "..";
import { deploySource } from "./utils";

describe("Test", function () {
    describe("uint256 add", function () {
        const body = `function get(uint256 a, uint256 b) public pure returns (uint256) { return a + b; }`;
        const promise = deploySource(body);

        it("checked", async function () {
            const a = new BN(10);
            const b = new BN(421787);
            // const body = `function get() public pure returns (uint256) { return uint256(${a.toString()}) + uint256(${b.toString()}); }`;
            // const { contract } = await deploySource(body);
            const { contract } = await promise;
            const output = await contract.get(a.toString(), b.toString());
            console.log("output:", output.toString());
            const expected = a.add(b);
            console.log("expected:", expected.toString());
            expect(output).to.equal(expected);
        });
        it("checked", async function () {
            const a = new BN(1550);
            const b = new BN(42175587);
            // const body = `function get() public pure returns (uint256) { return uint256(${a.toString()}) + uint256(${b.toString()}); }`;
            // const { contract } = await deploySource(body);
            const { contract } = await promise;
            const output = await contract.get(a.toString(), b.toString());
            console.log("output:", output.toString());
            const expected = a.add(b);
            console.log("expected:", expected.toString());
            expect(output).to.equal(expected);
        });
        it("checked", async function () {
            const a = new BN(1011);
            const b = new BN(42178117);
            // const body = `function get() public pure returns (uint256) { return uint256(${a.toString()}) + uint256(${b.toString()}); }`;
            // const { contract } = await deploySource(body);
            const { contract } = await promise;
            const output = await contract.get(a.toString(), b.toString());
            console.log("output:", output.toString());
            const expected = a.add(b);
            console.log("expected:", expected.toString());
            expect(output).to.equal(expected);
        });
        it("checked", async function () {
            const a = new BN(10);
            const b = new BN(421787);
            // const body = `function get() public pure returns (uint256) { return uint256(${a.toString()}) + uint256(${b.toString()}); }`;
            // const { contract } = await deploySource(body);
            const { contract } = await promise;
            const output = await contract.get(a.toString(), b.toString());
            console.log("output:", output.toString());
            const expected = a.add(b);
            console.log("expected:", expected.toString());
            expect(output).to.equal(expected);
        });
    });
});

