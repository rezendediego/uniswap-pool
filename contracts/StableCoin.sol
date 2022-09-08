// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StableCoin is ERC20 {
    uint256 stableAmount;
    address public admin;
    
    constructor(uint256 _stableAmount) ERC20("STB", "Stable Coin") {
      admin = msg.sender;
      stableAmount = _stableAmount;
     _mint(admin, stableAmount*10**18);   
     
    }
}
