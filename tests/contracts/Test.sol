// SPDX-License-Identifier: None
pragma solidity >=0.8.9;

contract Test {
    constructor() {}

    function uint256max() public pure returns (uint256) { return type(uint256).max; }
    function uint256min() public pure returns (uint256) { return type(uint256).min; }

    function int256max() public pure returns (int256) { return type(int256).max; }
    function int256min() public pure returns (int256) { return type(int256).min; }
}