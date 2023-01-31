import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import * as BN from "bn.js";

import { uint256, int256 } from "../../src/uint";
import * as C from "../../src/constants";


async function deployFixture() {    
    const [owner, otherAccount] = await ethers.getSigners();
    const Test = await ethers.getContractFactory("Test");
    const contract = await Test.deploy();
    return { contract, owner, otherAccount };
}

describe("Test", function () {

    describe("uint", function () {
        it("uint256.max", async function () {
            const { contract } = await loadFixture(deployFixture);
            let output = await contract.uint256max();
            let expected = uint256.max.bn;
            expect(output).to.equal(expected);
        });
        it("uint256.min", async function () {
            const { contract } = await loadFixture(deployFixture);
            let output = await contract.uint256min();
            let expected = uint256.min.bn;
            expect(output).to.equal(expected);
        });
        it("uint256 add", async function () {
            const { contract } = await loadFixture(deployFixture);
            let a = C.bit256.sub(C.BN256);
            let b = C.BN256.mul(C.BN2);
            let output = await contract.uint256add(a.toString(), b.toString());
            let expected = uint256(a).add(uint256(b)).bn;
            expect(output).to.equal(expected);
        });
    });

    
    describe("int", function () {
        it("int256.max", async function () {
            const { contract } = await loadFixture(deployFixture);
            let output = await contract.int256max();
            let expected = int256.max.bn;
            expect(output).to.equal(expected);
        });
        it("int256.min", async function () {
            const { contract } = await loadFixture(deployFixture);
            let output = await contract.int256min();
            let expected = int256.min.bn;
            expect(output).to.equal(expected);
        });
        it("int256 add", async function () {
            const { contract } = await loadFixture(deployFixture);
            let a = C.bit256.div(C.BN2).sub(C.BN256);
            let b = C.BN256.mul(C.BN2);
            let output = await contract.int256add(a.toString(), b.toString());
            let expected = int256(a).add(int256(b)).bn;
            expect(output).to.equal(expected);
        });
    });
})
