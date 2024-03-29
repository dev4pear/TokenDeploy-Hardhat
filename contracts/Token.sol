pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MyToken is ERC20 {
    address public owner;

    constructor(
        string memory name,
        string memory symbol,
        uint256 total
    ) ERC20(name, symbol) {
        owner = msg.sender;
        _mint(owner, total * 10 ** 18);
    }
}
