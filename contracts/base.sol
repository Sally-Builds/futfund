// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract base {
    struct Project {
        string name;
        uint expectedAmt;
        uint realizeAmt;
        uint startDate;
        uint endDate;
    }

    struct Donation {
        uint projectIndex;
        uint amount;
    }

    Project[] projects;
    mapping(address => Donation[]) userDonations;

    modifier greaterThanZero() {
        if(msg.value <= 0) {           
            revert();
        }else {
            _;
        }
    }

    modifier ended(uint _index) {
        if(block.timestamp < projects[_index].startDate || block.timestamp > projects[_index].endDate){
            revert("Crowdfunding has not started or has past");
        }else {
            _;
        }
    }

    function createProject(string memory _name, uint _expectedAmt, uint _startDate, uint _endDate) public returns(string memory, uint, uint){
        Project memory project;
        uint time = block.timestamp;

        project.name = _name;
        project.expectedAmt = _expectedAmt;
        project.realizeAmt = 0;
        project.startDate = _startDate != 0 ? time + _startDate * 1 days : time;
        project.endDate = time + _endDate * 1 days;
        projects.push(project);
        return (_name, _expectedAmt, 0);
    }

    function getProjects() public view returns(Project[] memory){
        return projects;
    }

    function createDonation(uint _index) public greaterThanZero ended(_index) payable {
        
        // checkIfUserHasDonated(_index);
        Donation[] memory donations = userDonations[msg.sender];
        for(uint i; i<donations.length; i++) {
            if(_index == donations[i].projectIndex) {
                updateDonation(_index);
                return;
            }
        }

        Donation memory donation;
        donation.projectIndex = _index;
        donation.amount = msg.value;
        projects[_index].realizeAmt += msg.value;
        userDonations[msg.sender].push(donation);
    }

    function getMyDonations() public view returns (Donation[] memory) {
        return userDonations[msg.sender];
    }

    function updateDonation(uint _index) public greaterThanZero ended(_index) payable {
        Donation[] memory donations = userDonations[msg.sender];
        for(uint i; i<donations.length; i++) {
            if(donations[i].projectIndex == _index) {
                projects[_index].realizeAmt += msg.value;
                donations[i].amount += msg.value;
                userDonations[msg.sender][i].amount += msg.value;
            }
        }
    }

    // function checkIfUserHasDonated(uint _index)private {
    //     Donation[] memory donations = userDonations[msg.sender];
    //     for(uint i; i<donations.length; i++) {
    //         if(_index == donations[i].projectIndex) {
    //             updateDonation(_index);
    //             return;
    //         }
    //     }
    // }

}