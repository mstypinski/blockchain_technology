// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Fundraising {

    address private owner;

    modifier isOwner() {
        // https://solidity-by-example.org/function-modifier/
        _;
    }

    constructor() {
        // https://docs.soliditylang.org/en/latest/units-and-global-variables.html#block-and-transaction-properties
    }

    function changeOwner(address newOwner) public isOwner {
        owner = newOwner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function fund() public payable {
        // https://solidity-by-example.org/payable/
    }

    function withdraw(address addressForWithdrawal) public isOwner {
        // https://solidity-by-example.org/sending-ether/
    }
} 
