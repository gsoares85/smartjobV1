// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SmartJob is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    function version() public pure returns (string memory) {
        return "1.0.0";
    }
}
