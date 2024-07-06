import {anyValue} from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {expect} from "chai";
import hre from "hardhat";
import SmartJobModule from "../ignition/modules/SmartJob";

describe("SmartJob", function () {
    async function deploy() {
        const [
            owner,
            company1,
            company2,
            person1,
            person2,
            person3
        ] = await hre.ethers.getSigners();

        const SmartJob = await hre.ethers.getContractFactory("SmartJob");
        const smartJob = await SmartJob.deploy();

        return {smartJob, owner, company1, company2, person1, person2, person3};
    }

    describe("Deployment", function () {
        it("Should deploy the contract", async function () {
            const {smartJob, owner} = await deploy();

            expect(await smartJob.getAddress()).to.exist;
        });
    });
});
