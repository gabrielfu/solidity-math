// SPDX-License-Identifier: None
pragma solidity >=0.8.9;

contract Test {
    constructor() {}
    
    // types min max
    function uint256max() public pure returns (uint256) { return type(uint256).max; }
    function uint256min() public pure returns (uint256) { return type(uint256).min; }
    function int256max() public pure returns (int256) { return type(int256).max; }
    function int256min() public pure returns (int256) { return type(int256).min; }

    // arithmetics
    function uint256add(uint256 a, uint256 b) public pure returns (uint256) { unchecked { return a + b; } }
    function int256add(int256 a, int256 b) public pure returns (int256) { return a + b; }
    function uint256sub(uint256 a, uint256 b) public pure returns (uint256) { return a - b; }
    function int256sub(int256 a, int256 b) public pure returns (int256) { return a - b; }
}