// // SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract PlacementManagementSystem {
    address public college;

    struct Company {
        string name;
        string jobDescription;
        uint256 stipend;
        uint256 eligibility;
    }

    struct Student {
        uint256 rollNumber;
        string name;
        uint256 cgpa;
        string branch;
        bool placed;
        mapping(uint256 => bool) appliedCompanies;
    }

    Company[] public companies;
    uint256 public numStudents;
    mapping(uint256 => Student) public students;

    constructor() {
        college = msg.sender;
    }

    modifier onlyCollege() {
        require(msg.sender == college, "Only the college can perform this action");
        _;
    }

    function addCompany(string memory name, string memory jobDescription, uint256 stipend, uint256 eligibility) public onlyCollege {
        companies.push(Company(name, jobDescription, stipend, eligibility));
    }

    function removeCompany(uint256 index) public onlyCollege {
        require(index < companies.length, "Invalid company index");
        companies[index] = companies[companies.length - 1];
        companies.pop();
    }

    function addStudent(uint256 rollNumber, string memory name, uint256 cgpa, string memory branch) public onlyCollege {
        Student storage s = students[numStudents++];
        s.rollNumber = rollNumber;
        s.name = name;
        s.cgpa = cgpa;
        s.branch = branch;
        s.placed = false;
    }

    function applyForCompany(uint256 studentIndex, uint256 companyIndex) public {
        require(studentIndex < numStudents, "Invalid student index");
        require(companyIndex < companies.length, "Invalid company index");
        
        Student storage student = students[studentIndex];
        Company storage company = companies[companyIndex];

        require(!student.placed, "Student is already placed");
        require(student.cgpa >= company.eligibility, "Student's CGPA does not meet company's eligibility");
        require(!student.appliedCompanies[companyIndex], "Student has already applied to this company");

        student.appliedCompanies[companyIndex] = true;
    }

    function placeStudent(uint256 studentIndex) public onlyCollege {
        require(studentIndex < numStudents, "Invalid student index");

        students[studentIndex].placed = true;
    }

    function getStudentsWhoAppliedForCompany(uint256 companyIndex) public view returns (uint256[] memory) {
        require(companyIndex < companies.length, "Invalid company index");

        uint256[] memory appliedStudents = new uint256[](numStudents);
        uint256 numAppliedStudents = 0;
        
        for (uint256 i = 0; i < numStudents; i++) {
            if (students[i].appliedCompanies[companyIndex]) {
                appliedStudents[numAppliedStudents] = i;
                numAppliedStudents++;
            }
        }

        // Trim the array to the actual number of applied students
        uint256[] memory finalAppliedStudents = new uint256[](numAppliedStudents);
        for (uint256 i = 0; i < numAppliedStudents; i++) {
            finalAppliedStudents[i] = appliedStudents[i];
        }

        return finalAppliedStudents;
    }

    function getPlacedStudents() public view returns (uint256[] memory) {
        uint256[] memory placedStudents = new uint256[](numStudents);
        uint256 numPlacedStudents = 0;

        for (uint256 i = 0; i < numStudents; i++) {
            if (students[i].placed) {
                placedStudents[numPlacedStudents] = i;
                numPlacedStudents++;
            }
        }

        // Trim the array to the actual number of placed students
        uint256[] memory finalPlacedStudents = new uint256[](numPlacedStudents);
        for (uint256 i = 0; i < numPlacedStudents; i++) {
            finalPlacedStudents[i] = placedStudents[i];
        }

        return finalPlacedStudents;
    }

    function getStudentAppliedCompanies(uint256 studentIndex) public view returns (uint256[] memory) {
        require(studentIndex < numStudents, "Invalid student index");

        uint256[] memory appliedCompanies = new uint256[](companies.length);
        uint256 numAppliedCompanies = 0;
        
        for (uint256 i = 0; i < companies.length; i++) {
            if (students[studentIndex].appliedCompanies[i]) {
                appliedCompanies[numAppliedCompanies] = i;
                numAppliedCompanies++;
            }
        }

        // Trim the array to the actual number of applied companies
        uint256[] memory finalAppliedCompanies = new uint256[](numAppliedCompanies);
        for (uint256 i = 0; i < numAppliedCompanies; i++) {
            finalAppliedCompanies[i] = appliedCompanies[i];
        }

        return finalAppliedCompanies;
    }
}

