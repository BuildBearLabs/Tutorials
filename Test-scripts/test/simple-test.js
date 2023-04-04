const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    // let simpleStorageFactory
    // let simpleStorage
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        //assert
        //expect
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const updatedValue = await simpleStorage.retrieve()
        assert.equal(updatedValue.toString(), expectedValue)
    })
    it("Should add person when we call addPeople", async function () {
        const expectedPersonName = "aman"
        const expectedPersonNumber = "3"
        const transactionResponse = await simpleStorage.addPeople(
            expectedPersonName,
            expectedPersonNumber
        )
        await transactionResponse.wait(1)
        const { name, favoriteNumber } = await simpleStorage.people(0)
        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedPersonNumber)
    })
})