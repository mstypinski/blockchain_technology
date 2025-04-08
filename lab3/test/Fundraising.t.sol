// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Fundraising} from "../src/Fundraising.sol";

contract FundraisingTest is Test {
    address public USER = makeAddr("user");
    address public OWNER = makeAddr("owner");

    
    Fundraising public fundraising;

    function setUp() public {
        vm.prank(OWNER);
        fundraising = new Fundraising();
    }

    function test_changeOwner() public {
        vm.prank(OWNER);
        fundraising.changeOwner(USER);
        assertEq(fundraising.getOwner(), USER);
    }

    function test_changeOwnerFail() public {
        vm.prank(USER);
        vm.expectRevert();
        fundraising.changeOwner(USER);
    }

    function test_fund() public {
        vm.deal(USER, 1 ether);
        vm.prank(USER);

        (bool success, ) = address(fundraising).call{value: 1 ether}(
            abi.encodeWithSignature("fund()")
        );
        assertTrue(success);
        assertEq(address(fundraising).balance, 1 ether);
    }

    function test_withdraw() public {
        vm.deal(address(fundraising), 1 ether);
        vm.prank(OWNER);
        fundraising.withdraw(OWNER);
        assertEq(OWNER.balance, 1 ether);
    }

    function test_withdrawFail() public {
        vm.deal(address(fundraising), 1 ether);
        vm.prank(address(0));
        
        vm.expectRevert();
        fundraising.withdraw(USER);
    }
}
