# solidity-hardhat-experiments: Multisig Wallet

### Contract files:
- `MultisigLib/IMultisigCore.sol`: Interface for `MultisigCore`
- `MultisigLib/MultisigCore.sol`: Core contract with all the Multisig logic, wallet implementations will inherit this
- `Multisig.sol`: Multisig Wallet implementation inherits `MultisigCore`
- `Reverter.sol`: Simple contract that throws error. To test external contract interaction

### Test files:
- `test/Multisig.test.ts`: Tests for the `Multisig` contract