const { expect } = require("chai");

require("chai");
require("ethers");

describe("Greeter", function () {
    let contract;

    beforeEach(async () => {
        const Greeter = await ethers.getContractFactory("Greeter");
        contract = await Greeter.deploy();
    });

    describe("sum", () => {
        it("should return 5 when given parameters are 2 and 3", async function () {
            await contract.deployed();

            const sum = await contract.sum(2, 3);

            console.log(sum);
            expect(sum.toNumber()).to.equal(5);
        });
    });

    describe("getMyLuckyNumber", () => {
        it("should return 5 when given 5", async () => {
            await contract.deployed();

            await contract.saveLuckyNumber(5);
            const myLuckyNumber = await contract.getMyLuckyNumber();


            expect(myLuckyNumber.toNumber()).to.equal(5);
        });
    });

    describe("saveLuckyNumber", () => {
        it("should revert with message 'Lucky number should not be 0.', when given 0", async () => {
            await contract.deployed();

            await expect(contract.saveLuckyNumber(0)).to.be.revertedWith(
                "Lucky number should not be 0."
            );
        });

        it("should revert with message 'You already have a lucky number.', when owner already have saved a lucky number", async () => {
            await contract.deployed();

            await contract.saveLuckyNumber(6);

            await expect(contract.saveLuckyNumber(7)).to.be.revertedWith(
                "You already have a lucky number."
            );
        });

        it("should retrieve 66 when recently given lucky number is 66", async () => {
            await contract.deployed();

            await contract.saveLuckyNumber(66);
            const storedLuckyNumber = await contract.getMyLuckyNumber();

            expect(storedLuckyNumber).to.be.not.undefined;
            expect(storedLuckyNumber).to.be.not.null;
            expect(storedLuckyNumber).to.be.not.equal(0);
            expect(storedLuckyNumber.toNumber()).to.be.equal(66);
        });
    });

    describe("updateLuckyNumber", () => {
        it("should revert with message '', when the given lucky number does not match with their existing lucky number", async () => {
            await contract.deployed();
            await contract.saveLuckyNumber(6);

            await expect(contract.updateLuckyNumber(8, 99)).to.be.revertedWith(
                "Not your previous lucky number."
            );
        });

        it("should update their lucky number, when given the exact existing lucky number stored", async () => {
            await contract.deployed();
            await contract.saveLuckyNumber(2);

            await contract.updateLuckyNumber(2, 22);
            const newLuckyNumber = await contract.getMyLuckyNumber();

            expect(newLuckyNumber).to.be.not.undefined;
            expect(newLuckyNumber).to.be.not.null;
            expect(newLuckyNumber.toNumber()).to.be.equal(22);
        });
    });


});