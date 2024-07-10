// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SmartJobV1 is Ownable {
    uint private companyId;

    event CompanyRegistered(uint indexed companyId, address companyAdmin);

    struct Company {
        uint id;
        address admin;
        string name;
        string description;
        string activityBranch;
        uint employeesNumber;
        uint jobsNumber;
        uint openJobsNumber;
        uint applicationsReceived;
    }

    mapping(uint => Company) private companies;

    error EmptyString(string field, string msg);
    error AlreadyRegistered(string method, string message);
    error CompanyNotFound(uint ID, string message);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function version() public pure returns (string memory) {
        return "1.0.0";
    }

    function registerCompany(string memory _name, string memory _description, string memory _activityBranch) public {
        if (keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(_name))) {
            revert EmptyString("name", "Company name is mandatory");
        }
        if (keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(_activityBranch))) {
            revert EmptyString("activityBranch", "Company activity branch is mandatory");
        }
        companyId++;
        Company storage comp = companies[companyId];

        comp.id = companyId;
        comp.admin = msg.sender;
        comp.name = _name;
        comp.description = _description;
        comp.activityBranch = _activityBranch;

        emit CompanyRegistered(companyId, msg.sender);
    }

    function getCompanyById(uint _id) public view returns (Company memory) {
        Company memory comp = companies[_id];
        if (_id > companyId || comp.id == 0) {
            revert CompanyNotFound(_id, "Company not found");
        }

        return comp;
    }
}
