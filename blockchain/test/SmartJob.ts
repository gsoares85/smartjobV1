import {anyValue} from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {expect} from "chai";
import hre from "hardhat";
import SmartJobModule from "../ignition/modules/SmartJob";
import {ethers} from "ethers";

describe("SmartJobV1", function () {
    async function deploy() {
        const [
            owner,
            company1,
            company2,
            person1,
            person2,
            person3
        ] = await hre.ethers.getSigners();

        const SmartJob = await hre.ethers.getContractFactory("SmartJobV1");
        const smartJob = await SmartJob.deploy(owner);

        return {smartJob, owner, company1, company2, person1, person2, person3};
    }

    describe("Deployment V1", function () {
        it("Should deploy the contract", async function () {
            const {smartJob, owner} = await deploy();

            expect(await smartJob.getAddress()).to.exist;
            expect(await smartJob.owner()).to.equal(owner);
        });
        it("Should validate version", async function () {
            const {smartJob} = await deploy();
            expect(await smartJob.version()).to.equal("1.0.0");
        });
    });
    describe("Register company", function ()  {
        it("Should register a company successfully", async function () {
            const { smartJob, company1 } = await deploy();
            expect(await smartJob.connect(company1).registerCompany("Sky Net", "World domination company", "robotics", 3))
                .to.emit(smartJob, "CompanyRegistered");
        });
        it("Should register a company with empty description successfully", async function () {
            const { smartJob, company1 } = await deploy();
            expect(await smartJob.connect(company1).registerCompany("Sky Net", "", "robotics", 5))
                .to.emit(smartJob, "CompanyRegistered");
        });
        it("Should validate empty company name", async function () {
            const { smartJob, company1 } = await deploy();
            await expect(smartJob.connect(company1).registerCompany("", "world domination company", "robotics", 3))
                .to.revertedWithCustomError(smartJob, "EmptyString")
                .withArgs("name", "Company name is mandatory");
        });
        it("Should validate empty company activity branch", async function () {
            const { smartJob, company1 } = await deploy();
            await expect(smartJob.connect(company1).registerCompany("Sky Net", "world domination company", "", 10))
                .to.revertedWithCustomError(smartJob, "EmptyString")
                .withArgs("activityBranch", "Company activity branch is mandatory");
        });
    });
    describe("Get company details by ID", function () {
        it("Should get a company by ID", async function () {
            const {smartJob, company1} = await deploy();
            expect(await smartJob.connect(company1).registerCompany("Sky Net", "", "robotics", 5))
                .to.emit(smartJob, "CompanyRegistered");
            expect((await smartJob.getCompanyById(1))[0].toString()).to.equal("1");
            expect((await smartJob.getCompanyById(1))[1]).to.equal(await company1.getAddress());
            expect((await smartJob.getCompanyById(1))[2]).to.equal("Sky Net");
            expect((await smartJob.getCompanyById(1))[3]).to.equal("");
            expect((await smartJob.getCompanyById(1))[4]).to.equal("robotics");
            expect((await smartJob.getCompanyById(1))[5].toString()).to.equal("5");
        });
        it("Should fail with invalid ID", async function () {
            const {smartJob, company1} = await deploy();
            expect(await smartJob.connect(company1).registerCompany("Sky Net", "", "robotics", 5))
                .to.emit(smartJob, "CompanyRegistered");
            await expect(smartJob.getCompanyById(5)).to
                .revertedWithCustomError(smartJob, "CompanyNotFound")
                .withArgs(5, "Company not found");
        });
    });
});
