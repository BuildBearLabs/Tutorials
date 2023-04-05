const { expect, assert } = require('chai');
const { ethers } = require('hardhat');
require('ethereum-waffle');

describe('MultiSigWallet Contract -----------------------------------------------------', () => {
    let owner1, owner2, owner3, sender, attacker, to0, to1, to2, MultiSigWallet, hardhatMultiSigWallet, MultiSigWalletAddress;

    before('deploying MultiSigWallet contract', async () => {
        [owner1, owner2, owner3, sender, attacker, to0, to1, to2] = await ethers.getSigners();
        MultiSigWallet = await ethers.getContractFactory('MultiSigWallet');
    });

    describe('initial code: constructor()', () => {
        it('should revert when no owners defined', async () => {
            await expect(MultiSigWallet.connect(owner1).deploy([], 2, 1111)).to.be.revertedWith('owner required');
        });

        it('should revert when minimumOwners > ownersCount', async () => {
            await expect(MultiSigWallet.connect(owner1).deploy([owner1.address, owner2.address, owner3.address], 4, 1111)).to.be.revertedWith('invalid minimum approvers count');
        });

        it('should revert when freeCancelPeriod is 0', async () => {
            await expect(MultiSigWallet.connect(owner1).deploy([owner1.address, owner2.address, owner3.address], 4, 0)).to.be.revertedWith('invalid minimum approvers count');
        });

        it('should match settled values', async () => {
            hardhatMultiSigWallet = await MultiSigWallet.connect(owner1).deploy([owner1.address, owner2.address, owner3.address], 3, 1111);
            MultiSigWalletAddress = hardhatMultiSigWallet.address;
            expect(await hardhatMultiSigWallet.connect(owner1).owners(0)).to.be.equal(owner1.address);
            expect(await hardhatMultiSigWallet.connect(owner1).owners(1)).to.be.equal(owner2.address);
            expect(await hardhatMultiSigWallet.connect(owner1).owners(2)).to.be.equal(owner3.address);
            expect(await hardhatMultiSigWallet.connect(owner1).isOwner(owner1.address)).to.be.equal(true);
            expect(await hardhatMultiSigWallet.connect(owner1).isOwner(owner2.address)).to.be.equal(true);
            expect(await hardhatMultiSigWallet.connect(owner1).isOwner(owner3.address)).to.be.equal(true);
            expect(await hardhatMultiSigWallet.connect(owner1).isOwner(attacker.address)).to.be.equal(false);
        });
    });

    describe('runtime code', () => {
        describe('receive()', () => {
            it('should emit Deposit() & balance+1000', async () => {
                expect(
                    await sender.sendTransaction({
                        to: MultiSigWalletAddress,
                        value: 1000,
                    })
                )
                    .to.emit(hardhatMultiSigWallet, 'Deposit')
                    .withArgs(1000, sender.address, '0x');

                expect(await ethers.provider.getBalance(MultiSigWalletAddress)).to.be.equal(1000);
                expect(await hardhatMultiSigWallet.availableBalance()).to.be.equal(1000);
            });
        });

        describe('fallback()', () => {
            it('should emit Deposit() & balance+1500', async () => {
                expect(
                    await sender.sendTransaction({
                        to: MultiSigWalletAddress,
                        value: 1500,
                        data: '0x8a26e497',
                    })
                )
                    .to.emit(hardhatMultiSigWallet, 'Deposit')
                    .withArgs(1500, sender.address, '0x8a26e497');

                expect(await ethers.provider.getBalance(MultiSigWalletAddress)).to.be.equal(2500);
                expect(await hardhatMultiSigWallet.availableBalance()).to.be.equal(2500);
            });
        });

        describe('submit()', () => {
            it('should revert when caller is not one of the owners', async () => {
                await expect(hardhatMultiSigWallet.connect(attacker).submit(to0.address, 501, '0x8a26e497')).to.be.revertedWith('only owners can call');
            });

            it('should revert when submitted value is more than wallet balance', async () => {
                await expect(hardhatMultiSigWallet.connect(owner2).submit(to1.address, 50000, '0x8a26e497')).to.be.revertedWith('balance is not enough');
            });

            it('should emit Approve() & Submit()', async () => {
                const tx = await hardhatMultiSigWallet.connect(owner1).submit(to0.address, 500, '0x8a26e497');
                const receipt = await tx.wait();
                const dateApprove = receipt.events[0].args[2];
                const dateSubmit = receipt.events[1].args[3];

                expect(tx).to.emit(hardhatMultiSigWallet, 'Approve').withArgs(0, owner1.address, dateApprove);
                expect(tx).to.emit(hardhatMultiSigWallet, 'Submit').withArgs(500, '0x8a26e497', 0, dateSubmit, to0.address);
                expect(await ethers.provider.getBalance(MultiSigWalletAddress)).to.be.equal(2500);
                expect(await hardhatMultiSigWallet.availableBalance()).to.be.equal(2000);
                expect(await hardhatMultiSigWallet.transactions(0)).to.be.ok;
                expect((await hardhatMultiSigWallet.transactions(0)).genesisDate).to.be.equal(dateSubmit);

                await hardhatMultiSigWallet.connect(owner2).submit(to1.address, 501, '0x8a26e498');
                await hardhatMultiSigWallet.connect(owner3).submit(to2.address, 502, '0x8a26e499');
            });
        });

        describe('approve() [before execution & cancellation]', () => {
            it('should revert when msg.sender already approved the transaction', async () => {
                await expect(hardhatMultiSigWallet.connect(owner1).approve(0)).to.be.revertedWith('you already approved this transaction');
            });

            it('should emit Approve()', async () => {
                const tx = await hardhatMultiSigWallet.connect(owner2).approve(0);

                expect(tx)
                    .to.emit(hardhatMultiSigWallet, 'Approve')
                    .withArgs(0, owner2.address, (await tx.wait()).events[0].args[2]);

                assert.isTrue(await hardhatMultiSigWallet.isApprover(0, owner1.address));
                assert.isTrue(await hardhatMultiSigWallet.isApprover(0, owner2.address));
                assert.isFalse(await hardhatMultiSigWallet.isApprover(0, owner3.address));

                await hardhatMultiSigWallet.connect(owner3).approve(0);
                await hardhatMultiSigWallet.connect(owner2).approve(2);
                await hardhatMultiSigWallet.connect(owner1).approve(2);
            });
        });

        describe('cancel()', () => {
            it('should revert when caller is not owner', async () => {
                await expect(hardhatMultiSigWallet.connect(attacker).cancel(0)).to.be.revertedWith('only owners can call');
            });

            it('should revert when caller is not creator & freeCancelPeriod is not passed', async () => {
                await expect(hardhatMultiSigWallet.connect(owner2).cancel(0)).to.be.revertedWith('only creator can cancel this transaction or wait till freeCancelPeriod');
            });

            it('should emit Cancel when caller is creator', async () => {
                const tx = await hardhatMultiSigWallet.connect(owner3).cancel(2);
                const receipt = await tx.wait();
                expect(tx).to.emit(hardhatMultiSigWallet, 'Cancel').withArgs(2, receipt.events[0].args[1]);
            });

            it('should travel to now + period1 => so contribution time is over', async () => {
                const blockNumBefore = await ethers.provider.getBlockNumber();
                const blockBefore = await ethers.provider.getBlock(blockNumBefore);
                const timestampBefore = blockBefore.timestamp;

                await ethers.provider.send('evm_increaseTime', [1111]);
                await ethers.provider.send('evm_mine');

                const blockNumAfter = await ethers.provider.getBlockNumber();
                const blockAfter = await ethers.provider.getBlock(blockNumAfter);
                const timestampAfter = blockAfter.timestamp;

                // console.log(`timeStampBefore: ${timestampBefore}, timeStampAfter: ${timestampAfter}`);
                expect(blockNumAfter).to.be.equal(blockNumBefore + 1);
                expect(Math.round(timestampAfter / 10)).to.be.equal(Math.round((timestampBefore + 1111) / 10));
            });

            it('should emit Cancel when caller is not creator but freeCancelPeriod is passed', async () => {
                const tx = await hardhatMultiSigWallet.connect(owner1).cancel(1);
                const receipt = await tx.wait();
                expect(tx).to.emit(hardhatMultiSigWallet, 'Cancel').withArgs(1, receipt.events[0].args[1]);
            });
        });

        describe('execute()', () => {
            it('should revert when txId >= transactionsCount', async () => {
                await expect(hardhatMultiSigWallet.connect(owner1).execute(3)).to.be.revertedWith("transaction doesn't exist");
            });

            it('should revert when not approved by minimum required', async () => {
                await expect(hardhatMultiSigWallet.connect(owner1).execute(1)).to.be.revertedWith('transaction not approved by minimum required');
            });

            it('should revert when transaction is cancelled ', async () => {
                await expect(hardhatMultiSigWallet.connect(owner1).execute(2)).to.be.revertedWith('this transaction is cancelled');
            });

            it('should emit Execute', async () => {
                const tx = await hardhatMultiSigWallet.connect(owner1).execute(0);
                const receipt = await tx.wait();

                await expect(tx).to.emit(hardhatMultiSigWallet, 'Execute').withArgs(0, ethers.utils.formatBytes32String('Successful').slice(0, 22), receipt.events[0].args[2]);
            });
        });
    });
});