const { expect } = require("chai");
    const chai = require("chai");

    const chaiAsPromised = require("chai-as-promised");

    describe("IPLBetting", function () {
      let IPLBetting;
      let iplBetting;

      beforeEach(async function () {
        IPLBetting = await ethers.getContractFactory("IPLBetting");
        iplBetting = await IPLBetting.deploy();
        await iplBetting.deployed();
      });

      it("should allow a player to place a bet", async function () {
        const betAmount = 1;
        const team = 1;

        const bettorAddress = await (await ethers.getSigners())[0].getAddress();

        await iplBetting.placeBet(team, { value: betAmount });

        const bet = await iplBetting.getBet(0);

        expect(bet.bettor).to.equal(bettorAddress);
        expect(bet.amount).to.equal(betAmount);
        expect(bet.team).to.equal(team);
        expect(bet.paidOut).to.equal(false);
      });

      it("should not allow a bet of 0 ether", async function () {
        const team = 1;

        await expect(iplBetting.placeBet(team, { value: 0 })).to.be.rejectedWith(
          "Bet amount must be greater than 0."
        );
      });
    });

    chai.use(chaiAsPromised);