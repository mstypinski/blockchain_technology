// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Fundraising} from "../src/Fundraising.sol";

contract FundraisingScript is Script {
    Fundraising public fundraising;

    function run() external returns (Fundraising) {
        // hhttps://book.getfoundry.sh/forge/cheatcodes
        vm.startBroadcast();

        fundraising = new Fundraising();

        vm.stopBroadcast();

        return fundraising;
    }

}
