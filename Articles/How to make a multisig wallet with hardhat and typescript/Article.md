# How to build a multisig wallet with hardhat and typescript

In this article we will learn how to build one basic multisig wallet of our own. We will get to learn about hardhat and testing of a smart contract using hardhat.

This is going to be a longer post so it is recommended that you take your time and follow along with this tutorial to gain most out of it. In case of any query feel free to contact me.

## What is multisig wallet?

You can think of multisig wallet as a joint bank account, where signature of multiple parties are required to initiate the transaction from the account. Similarly multisig wallet is a smart contract based wallet which is maintained by multiple different accounts. These accounts are known as owners or admins of the multisig wallet.

### Transaction Life Cycle

Every transaction of the multisig wallet goes through a perticular life cycle, i.e. it goes through certain stages.
To begin the cycle one of the admins will `Submit` that transaction to the wallet's transactions pool.
After that other admins `Approve` that transaction if they agree with the transaction.
Admins can also `Revoke` their approval before the transaction gets executed.
Once a transaction gets minimum required approvals from the admins any of the admin can then `Execute` that transaction.

Enough with the theory now let's dive deep into building our own implementation of such multisig wallet. We will use hardhat and typescript in this process. First we will setup a basic starter project with hardhat and typescript, fortunately large part of this step is automated with hardhat starter script.
Next we will write `IMultisigCore` and `MultisigCore` smart contract, this contract will have the core functionalities of the multisig wallet as mentioned above in the article.
Other contracts will inherit `MultisigCore` to add core functionalities to their multisig wallet implementation. We will also inherit this contract in our `Multisig` contract in order to follow the same pattern.

## Hardhat Setup

Let's begin with the hardhat starter project setup. Navigate to the folder where you want to create this project. Then type the following command `yarn init` and follow the instructions press enter to keep the defaults. This will create a `package.json` file,i.e. it will create a node project in this directory.
Now to install hardhat as a one of the dev dependencies run the command `yarn add --dev hardhat`. We use `--dev` flag because hardhat is a development depencency. After successful execution of the above command you can see hardhat added as one of the devDependencies in `package.json`.

Now to run the hardhat command run `yarn hardhat` when you run this command for the first time you will be prompted with welcome prompt. Choose `Create a TypeScript project` with your arrow keys and press enter to keep the defaults. It will install some other depencancies to make it easier to work with types in typescript, etc. Once done you can see that the script has created a boilerplate code with typescript. You will have `Lock.sol`, `Lock.ts` in contracts and test directories and `deploy.ts` in scripts directory. You can safely delete those files as in the next section we will be writing our own contract files.

## `IMultisigCore` interface

Now that we are done with the basic environment setup let's start building our multisig wallet library from scratch. In the `contracts` folder of our project create a sub-folder named `MultisigLib`. All the code for this project is available on the repository linked at the end.

Now we will create an interface `IMultisigCore` for our multisig core library contract. This interface file will have declarations for the errors and events emited from our multisig contract. You can see from the below code snipet that our contract will emit 5 events `Deposit`, `Submit`,`Approve`,`Revoke`, and `Execute`. Read through the comments in the code to understand more about these events.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IMultisigCore {
  // Errors //
  // ... //

  // Events //
  /**
   * @notice Emitted when someone deposits to contract
   * @param sender Transaction id
   * @param value Value deposited
   * @param data Data from of deposit transaction
   */
  event Deposit(address indexed sender, uint256 indexed value, bytes data);

  /**
   * @notice Emitted when new Transaction is Submited
   * @param txId Transaction id
   * @param admin Admin that called the function
   */
  event Submit(uint256 indexed txId, address indexed admin);

  /**
   * @notice Emitted when an admin Approves a Transaction
   * @param txId Transaction id
   * @param admin Admin that called the function
   */
  event Approve(uint256 indexed txId, address indexed admin);

  /**
   * @notice Emitted when an admin Revokes the Approval of a Transaction
   * @param txId Transaction id
   * @param admin Admin that called the function
   */
  event Revoke(uint256 indexed txId, address indexed admin);

  /**
   * @notice Emitted when an admin Executes an Approved Transaction
   * @param txId Transaction id
   * @param success Success from transaction execution call
   * @param data Data from transaction execution call
   */
  event Execute(uint256 indexed txId, bool indexed success, bytes indexed data);
}
```

Solidity supports custom errors since v0.8.4. Below is a code snipet containing the custom errors thrown by the multisig core at different points. You can read through the comments to undertand when we revert with a perticular error.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IMultisigCore {
  // Errors //
  /** @notice Throw if submited Txn value > availableBalance */
  error InvalidTxnValue();

  /** @notice Throw if minApproval > admins.length */
  error InvalidMinApproval();

  /**
   * @notice Throw if not Admin
   * @param caller Caller of the function
   */
  error NotAdmin(address caller);

  /**
   * @notice Throw if Txn is Already Executed
   * @param txId Transaction id
   */
  error AlreadyExecuted(uint256 txId);

  /**
   * @notice Throw if Txn is Already Approved
   * @param txId Transaction id
   * @param admin Admin that called the function
   */
  error AlreadyApproved(uint256 txId, address admin);

  /**
   * @notice Throw if Txn is Not Approved Yet
   * @param txId Transaction id
   * @param admin Admin that called the function
   */
  error NotApprovedYet(uint256 txId, address admin);

  /**
   * @notice Throw if Txn does not have enough approvals
   * @param txId Transaction id
   */
  error NotEnoughApprovals(uint256 txId);

  // Events //
  // ... //
}
```

This concludes `IMultisigCore` interface which discribes the events emited and the errors thrown by the `MultisigCore` contract.

## `MultisigCore` contract

Now let's take a look at `MultisigCore` contract where all the multisig magic happens. We will start with the transaction struct and other state variable declaration.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IMultisigCore.sol";

/**
 * @title Multisig Core
 */
contract MultisigCore is IMultisigCore {
  // Structs //
  struct Transaction {
    address to;
    uint256 value;
    bytes data;
    bool isExecuted;
  }

  // State Variables //
  address[] public admins;
  mapping(address => bool) public isAdmin;
  Transaction[] public transactions;

  uint8 internal minApprovals;
  uint256 public availableBalance;
  uint256 public nounce;

  mapping(uint256 => mapping(address => bool)) public isApprover;

  // Modifiers //
  // ... //

  // Functions //
  // ... //

  // Helpers //
  // ... //
}
```

As you can see in the code snipet above that transaction has four attributes `to` address, `value`, `data`, and `isExecuted` bool. Other than this we have on `admins` array of address, one `isAdmin` mapping to quickly check if given address is admin or not, We have simmilar mapping `isApprover` to check if for a given transaction, a given admin is approver or not. We also have `minApprovals` which is the minimum required approvals to execute any transactions. `availableBalance` is the balance of the multisig available to spend in transactions. Next Let's look at some function modifiers in the contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IMultisigCore.sol";

/**
 * @title Multisig Core
 */
contract MultisigCore is IMultisigCore {
  // Structs //
  // ... //

  // State Variables //
  // ... //

  // Modifiers //
  /** @notice Requires caller to be Admin */
  modifier onlyAdmin() {
    // revert if not admin
    if (!isAdmin[msg.sender]) {
      revert NotAdmin(msg.sender);
    }
    _;
  }

  /** @notice Requires Transaction not executed already */
  modifier notExecuted(uint256 txId) {
    // revert if already executed
    if (transactions[txId].isExecuted) {
      revert AlreadyExecuted(txId);
    }
    _;
  }

  /** @notice Requires Transaction not approved already by the caller */
  modifier notApproved(uint256 txId) {
    // revert if already approved
    if (isApprover[txId][msg.sender]) {
      revert AlreadyApproved(txId, msg.sender);
    }
    _;
  }

  /** @notice Requires Transaction to be approved by the caller */
  modifier isApproved(uint256 txId) {
    // revert if not yet approved
    if (!isApprover[txId][msg.sender]) {
      revert NotApprovedYet(txId, msg.sender);
    }
    _;
  }

  // Functions //
  // ... //

  // Helpers //
  // ... //
}
```

`onlyAdmin` allows only admins to call the function. `notExecuted` checks and allows the function call if given transaction is not executed yet, Simillarly `notApproved` checks and allows the function call only if given transaction is not yet approved by the caller, i.e. reverts if already approved by the caller. `isApproved` is the inverse of the `notApproved` modifier. Now we will look into the constructor and other functions of the contract where these modifiers are used.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IMultisigCore.sol";

/**
 * @title Multisig Core
 */
contract MultisigCore is IMultisigCore {
  // Structs //
  // ... //

  // State Variables //
  // ... //

  // Modifiers //
  // ... //

  // Functions //
  /**
   * @param _admins Admin addresses of the Multisig
   * @param _minApprovals Minimum Approvals required to execute
   */
  constructor(address[] memory _admins, uint8 _minApprovals) {
    admins = _admins;

    if (_minApprovals > _admins.length) {
      revert InvalidMinApproval();
    }
    minApprovals = _minApprovals;

    for (uint8 i; i < _admins.length; i++) {
      isAdmin[_admins[i]] = true;
    }
  }

  /**
   * @notice Submit new Transaction
   * @param _to To address for the Transaction
   * @param _value Value to send in the Transaction
   * @param _data Data to send with the Transaction
   * @dev onlyAdmin is not checked here, should be done while inheriting
   */
  function _submit(
    address _to,
    uint256 _value,
    bytes calldata _data
  ) internal returns (uint256 txId) {
    if (_value > availableBalance) {
      revert InvalidTxnValue();
    }
    transactions.push(
      Transaction({ to: _to, value: _value, data: _data, isExecuted: false })
    );
    availableBalance -= _value;
    txId = transactions.length - 1;

    emit Submit(txId, msg.sender);
    return txId;
  }

  /**
   * @notice Approve a Transaction
   * @param _txId Transaction id
   * @dev onlyAdmin is not checked here, should be done while inheriting
   */
  function _approve(
    uint256 _txId
  ) internal notApproved(_txId) notExecuted(_txId) {
    isApprover[_txId][msg.sender] = true;
    emit Approve(_txId, msg.sender);
  }

  /**
   * @notice Revoke an Approval for a Transaction
   * @param _txId Transaction id
   * @dev onlyAdmin is not checked here, should be done while inheriting
   */
  function _revoke(
    uint256 _txId
  ) internal isApproved(_txId) notExecuted(_txId) {
    isApprover[_txId][msg.sender] = false;
    emit Revoke(_txId, msg.sender);
  }

  /**
   * @notice Execute an Approved Transaction
   * @param _txId Transaction id
   * @dev onlyAdmin is not checked here, should be done while inheriting
   */
  function _execute(uint256 _txId) internal notExecuted(_txId) {
    // revert if not enough approvals
    if (getApprovalCount(_txId) < minApprovals) {
      revert NotEnoughApprovals(_txId);
    }
    Transaction storage txn = transactions[_txId];
    txn.isExecuted = true;
    nounce++;

    (bool success, bytes memory data) = txn.to.call{ value: txn.value }(
      txn.data
    );
    if (!success) {
      // We need to add the value back in the availableBalance else it will be locked forever
      availableBalance += txn.value;
    }
    emit Execute(_txId, success, data);
  }

  // Helpers //
  /**
   * @notice Get Approval Count for a Transaction
   * @param _txId Transaction id
   */
  function getApprovalCount(uint256 _txId) internal view returns (uint8 count) {
    for (uint8 i; i < admins.length; i++) {
      if (isApprover[_txId][admins[i]]) {
        count++;
      }
    }
  }
}
```

In the constructor of this contract we set the `admins` and `minApprovals`, and update the `isAdmin` mapping for the all the given admins. In `_submit` function we push new transaction to the `transactions` arrary, update `availableBalance` and emit `Submit` event. In `_approve` and `_revoke` functions we update `isApprover` mapping and emit `Approve` or `Revoke` event accordingly. In `_execute` function we check for the approval count for the transaction and then if we have minimum required approvals we updated the transaction in the storage and execute the transaction with following lines of code.

```solidity
    Transaction storage txn = transactions[_txId];
    txn.isExecuted = true;
    nounce++;

    (bool success, bytes memory data) = txn.to.call{value: txn.value}(
        txn.data
    );
    if (!success) {
        // We need to add the value back in the availableBalance else it will be locked forever
        availableBalance += txn.value;
    }
```

With `txn.to.call{value: txn.value}(txn.data)` we are passing the value and data of the transaction in the call to the address in `txn.to`. This is it for the `MultisigCore` contract, this is all it takes to create a multisig wallet.

## `Multisig` Wallet contract

In the last section we wrote the `MultisigLib` contracts, i.e. `MultisigLib/IMultisigCore`, and `MultisigLib/MultisigCore`. In this section we will use that contract to build our multisig wallet. In the contracts folder, i.e. outside the `MultisigLib` folder create a new file `Multisig.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "./MultisigLib/MultisigCore.sol";

/**
 * @title Multisig Wallet
 */
contract Multisig is MultisigCore {
  // Functions //
  /**
   * @param _admins Admin addresses of the Multisig
   * @param _minApprovals Minimum Approvals required to execute
   */
  constructor(
    address[] memory _admins,
    uint8 _minApprovals
  ) MultisigCore(_admins, _minApprovals) {}

  receive() external payable {
    availableBalance += msg.value;
    emit Deposit(msg.sender, msg.value, "");
  }

  fallback() external payable {
    availableBalance += msg.value;
    emit Deposit(msg.sender, msg.value, msg.data);
  }

  /**
   * @notice Submit new Transaction
   * @param _to To address for the Transaction
   * @param _value Value to send in the Transaction
   * @param _data Data to send with the Transaction
   */
  function submit(
    address _to,
    uint256 _value,
    bytes calldata _data
  ) external onlyAdmin returns (uint256 txId) {
    txId = _submit(_to, _value, _data);
    return txId;
  }

  /**
   * @notice Approve a Transaction
   * @param _txId Transaction id
   * @dev onlyAdmin is not checked here, should be done while inheriting
   */
  function approve(uint256 _txId) external onlyAdmin {
    _approve(_txId);
  }

  /**
   * @notice Revoke an Approval for a Transaction
   * @param _txId Transaction id
   * @dev onlyAdmin is not checked here, should be done while inheriting
   */
  function revoke(uint256 _txId) external onlyAdmin {
    _revoke(_txId);
  }

  /**
   * @notice Execute an Approved Transaction
   * @param _txId Transaction id
   * @dev onlyAdmin is not checked here, should be done while inheriting
   */
  function execute(uint256 _txId) external onlyAdmin {
    _execute(_txId);
  }
}
```

As you can see above `submit`, `approve`, `revoke`, `execute` function, and the contructor of this contract are fairly straight forward. Only new thing in this contract is the `receive` and `fallback` functions, these are the functions that allow this contract to receive funds even without calling any function call.

## Deployment script

Next we will write the deployment script to deploy this multisig contract. This script is simmilar to the default script from the hardhat starter. Below is the containts of the `deploy.ts` script.

```typescript
import { ethers } from "hardhat";

async function main() {
  const [admin1, admin2, admin3] = await ethers.getSigners();
  const multisigFactory = await ethers.getContractFactory("Multisig");

  console.log("Deploying the Multisig Wallet contract...");
  const multisig = await multisigFactory.deploy([admin1, admin2, admin3], 2);

  console.log(
    `Deployed to ${await multisig.getAddress()} by ${admin1.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## Testing multisig wallet constract

We now have a multisig wallet contract, now we will test the functionalities of this contract. Hardhat uses mocha and chai for testing smart contracts. All these test follow describe-it formate of writing test.

```typescript
describe("Something", function () {
  it("Should do the thing we are testing", function () {
    // Tests with assert or expect etc.
  });
});
```
One such describe block can also have other nested describe inside it. This allows us to describe our contract with such describes and nested describes that test different parts of the contract.
```typescript
describe("Something", function () {
  it("Should do the thing we are testing", function () {
    // Tests with assert or expect etc.
  });
  describe("Something nested", function () {
    it("Should do the thing we are testing", function () {
      // Tests with assert or expect etc.
    });
  });
});
```

## Fixutres and loadFixture

Hardhat allows for fixtures which is a way to have multiple tests have same initial conditions. Fixture is basically a way to restore the network back to a certain state. First time when `loadFixture` is called with a function it runs the function and for every time it is called next hardhat resets network to the state it was in at the first run of function. This allows us to have same initial conditions for our tests. For our tests we will mainly use three fixtures `deployMultisigFixture`, `depositFixture`, and `submitFixture` each of these fixture build on top of each other. You can see that in below code snipet.

```typescript
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";

describe("Multisig", function () {
  async function deployMultisigFixture() {
    const [admin1, admin2, admin3, other] = await ethers.getSigners();
    const minApproval = 2;
    const multisigFactory = await ethers.getContractFactory("Multisig");
    const multisigContract = await multisigFactory.deploy(
      [admin1, admin2, admin3],
      minApproval
    );

    return {
      multisigContract,
      multisigFactory,
      minApproval,
      admin1,
      admin2,
      admin3,
      other,
    };
  }

  async function depositFixture() {
    const {
      multisigContract,
      multisigFactory,
      minApproval,
      admin1,
      admin2,
      admin3,
      other,
    } = await deployMultisigFixture();

    const transferAmount = parseEther("1");

    await admin1.sendTransaction({
      to: await multisigContract.getAddress(),
      value: transferAmount,
    });

    await admin2.sendTransaction({
      to: await multisigContract.getAddress(),
      value: transferAmount,
    });

    await admin3.sendTransaction({
      to: await multisigContract.getAddress(),
      value: transferAmount,
    });

    const availableBalance = await multisigContract.availableBalance();
    const ONE_ETH = parseEther("1");

    return {
      multisigContract,
      multisigFactory,
      availableBalance,
      ONE_ETH,
      minApproval,
      admin1,
      admin2,
      admin3,
      other,
    };
  }

  async function submitFixture() {
    const {
      multisigContract,
      multisigFactory,
      availableBalance,
      ONE_ETH,
      minApproval,
      admin1,
      admin2,
      admin3,
      other,
    } = await depositFixture();

    const tx0 = await multisigContract
      .connect(admin1)
      .submit(admin1.address, ONE_ETH, "0x");
    await tx0.wait();

    const tx1 = await multisigContract
      .connect(admin2)
      .submit(other.address, parseEther("0.000001"), "0x");
    await tx1.wait();

    const tx2 = await multisigContract
      .connect(admin3)
      .submit(admin3.address, ONE_ETH, "0x");
    await tx2.wait();

    return {
      multisigContract,
      multisigFactory,
      availableBalance,
      ONE_ETH,
      minApproval,
      admin1,
      admin2,
      admin3,
      other,
    };
  }

  // Tests Here
  describe("Deployment", function () {});
  describe("Deposit", function () {});
  describe("Submit", function () {});
  describe("Approve", function () {});
  describe("Revoke", function () {});
  describe("Execute", function () {});
  describe("Contract Interaction", function () {});
});
```

`deployMultisigFixture` as the name suggests is the deployment fixture, it provides the deployed contract, contract factory, and other deployment parameters. `depositFixture` builds on top of `deployMultisigFixture` where all three admins transfer one ether to the multisig contract. `submitFixture` builds on top of `depositFixture` where all three admins submit one transaction each.

```typescript
describe("Execute", function () {
  it("Should be callable by only admins", async function () {
    const { multisigContract, admin1, admin2, admin3, other } =
      await loadFixture(submitFixture);
    const tx1 = await multisigContract.connect(admin1).approve(0);
    await tx1.wait();
    const tx2 = await multisigContract.connect(admin2).approve(0);
    await tx2.wait();
    const tx3 = await multisigContract.connect(admin3).approve(0);
    await tx3.wait();

    await expect(multisigContract.connect(other).execute(0))
      .to.revertedWithCustomError(multisigContract, "NotAdmin")
      .withArgs(other.address);
    await expect(multisigContract.connect(admin1).execute(0)).to.not.reverted;
  });

  it("Should revert if not enough approvals", async function () {
    const { multisigContract, admin1 } = await loadFixture(submitFixture);
    const tx1 = await multisigContract.connect(admin1).approve(0);
    await tx1.wait();

    await expect(multisigContract.connect(admin1).execute(0))
      .to.revertedWithCustomError(multisigContract, "NotEnoughApprovals")
      .withArgs(0);
  });

  it("Should revert if already Executed", async function () {
    const { multisigContract, admin1, admin2, admin3 } = await loadFixture(
      submitFixture
    );
    const tx1 = await multisigContract.connect(admin1).approve(0);
    await tx1.wait();
    const tx2 = await multisigContract.connect(admin2).approve(0);
    await tx2.wait();
    const tx3 = await multisigContract.connect(admin3).approve(0);
    await tx3.wait();
    const tx4 = await multisigContract.connect(admin3).execute(0);
    await tx4.wait();

    await expect(multisigContract.connect(admin1).execute(0))
      .to.revertedWithCustomError(multisigContract, "AlreadyExecuted")
      .withArgs(0);
  });

  it("Should update transaction status correctly", async function () {
    const { multisigContract, admin1, admin2, admin3 } = await loadFixture(
      submitFixture
    );
    const tx1 = await multisigContract.connect(admin1).approve(0);
    await tx1.wait();
    const tx2 = await multisigContract.connect(admin2).approve(0);
    await tx2.wait();
    const tx3 = await multisigContract.connect(admin3).approve(0);
    await tx3.wait();
    const tx4 = await multisigContract.connect(admin3).execute(0);
    await tx4.wait();

    expect((await multisigContract.transactions(0)).isExecuted).to.equal(true);
  });

  it("Should update nounce correctly", async function () {
    const { multisigContract, admin1, admin2, admin3 } = await loadFixture(
      submitFixture
    );
    const tx1 = await multisigContract.connect(admin1).approve(0);
    await tx1.wait();
    const tx2 = await multisigContract.connect(admin2).approve(0);
    await tx2.wait();
    const tx3 = await multisigContract.connect(admin3).approve(0);
    await tx3.wait();
    const tx4 = await multisigContract.connect(admin2).revoke(0);
    await tx4.wait();
    const tx5 = await multisigContract.connect(admin3).execute(0);
    await tx5.wait();

    expect(await multisigContract.nounce()).to.equal(1);
  });

  it("Should emit Execute event", async function () {
    const { multisigContract, admin1, admin2 } = await loadFixture(
      submitFixture
    );

    const tx1 = await multisigContract.connect(admin1).approve(0);
    await tx1.wait();
    const tx2 = await multisigContract.connect(admin2).approve(0);
    await tx2.wait();

    await expect(multisigContract.connect(admin1).execute(0))
      .to.emit(multisigContract, "Execute")
      .withArgs(0, true, "0x");
  });
});
```
Above is the code snipet of the tests for execute functionality, all other tests are writen in simmilar way. You can find and read through all the tests in `Multisig.test.ts` file in test directory in the repo associated with this post.
This concludes the post thank you for reading till the end, hope you have learned something from this.

### Repo: `ts-multisig` [nisargsc/multisig-hhe](https://github.com/nisargsc/multisig-hhe)

### Author: Nisarg Chaudhari ([@nisargsc](https://twitter.com/nisargsc))
