# Multisig Wallet using typescript and Hardhat

### Contract files:

- `MultisigLib/IMultisigCore.sol`: Interface for `MultisigCore`
- `MultisigLib/MultisigCore.sol`: Core contract with all the Multisig logic, wallet implementations will inherit this
- `Multisig.sol`: Multisig Wallet implementation inherits `MultisigCore`
- `Reverter.sol`: Simple contract that throws error. To test external contract interaction

### Test files:

- `Multisig.test.ts`: Tests for the `Multisig` contract

#### Original repo: [multisig-hhe](https://github.com/nisargsc/multisig-hhe.git)

### Author: Nisarg Chaudhari ([@nisargsc](https://github.com/nisargsc))
