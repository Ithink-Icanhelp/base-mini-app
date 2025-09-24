// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BaseApp {
    mapping(address => uint256) public userInteractions;
    uint256 public totalInteractions;
    
    event Interacted(address indexed user, uint256 timestamp); // Добавим indexed для экономии газа
    
    function interact() public {
        userInteractions[msg.sender]++;
        totalInteractions++;
        emit Interacted(msg.sender, block.timestamp);
    }
    
    function batchInteract(uint8 count) public {
        require(count > 0 && count <= 10, "1-10 interactions allowed");
        userInteractions[msg.sender] += count;
        totalInteractions += count;
        emit Interacted(msg.sender, block.timestamp);
    }
    
    function getMyInteractions() public view returns (uint256) {
        return userInteractions[msg.sender];
    }
    
    // Добавим функцию для массового взаимодействия (дешевле)
    function interactWithReferral(address referral) public {
        userInteractions[msg.sender]++;
        if (referral != address(0) && referral != msg.sender) {
            userInteractions[referral]++; // Реферальная система
        }
        totalInteractions++;
        emit Interacted(msg.sender, block.timestamp);
    }
}