// File: test/EventHub.test.js
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("EventHub", function () {
  let contractFactory;
  let contract;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    contractFactory = await ethers.getContractFactory("EventHub");
    contract = await contractFactory.deploy();

    await contract.waitForDeployment();
  });

  describe("createEvent", function () {
    it("Should create a new event", async function () {
      await contract.createEvent(
        "Title",
        "Description",
        "Image",
        "Date",
        "Time",
        1,
        "MeetURL",
        100
      );

      const events = await contract.getAllEvents();
      assert.equal(events.length, 1);
      assert.equal(events[0].eventOwner, owner.address);
    });
  });

  describe("registerForEvent", function () {
    it("Should revert if the event index is invalid", async function () {
      try {
        await contract.connect(addr1).registerForEvent(owner.address, 1, 100);
        assert.fail("Expected revert not received");
      } catch (error) {
        assert.include(error.message, "Invalid event");
      }
    });

    it("Should revert if the organizer tries to register", async function () {
      try {
        await contract.createEvent(
          "Title",
          "Description",
          "Image",
          "Date",
          "Time",
          1,
          "MeetURL",
          100
        );
        await contract.connect(owner).registerForEvent(owner.address, 1, 0);
        assert.fail("Expected revert not received");
      } catch (error) {
        assert.include(
          error.message,
          "The organizer cannot register for the event."
        );
      }
    });
  });
});
