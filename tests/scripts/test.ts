import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import * as BN from "bn.js";

import * as uint from "../../src/uint";


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
            let expected = uint.uint256.max.bn;
            expect(output).to.equal(expected);
        });
        it("uint256.min", async function () {
            const { contract } = await loadFixture(deployFixture);
            let output = await contract.uint256min();
            let expected = uint.uint256.min.bn;
            expect(output).to.equal(expected);
        });
    });

    
    describe("int", function () {
        it("int256.max", async function () {
            const { contract } = await loadFixture(deployFixture);
            let output = await contract.int256max();
            let expected = uint.uint256.max.bn;
            expect(output).to.equal(expected);
        });
        it("int256.min", async function () {
            const { contract } = await loadFixture(deployFixture);
            let output = await contract.int256min();
            let expected = uint.uint256.min.bn;
            expect(output).to.equal(expected);
        });
    });
})
