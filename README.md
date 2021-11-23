# NetwonSwap smart contract
smart contract for swapping AUT / NEW 1 for 1

deployed on DevNet to '0xB91404aCe195605FDc238b6d1Ab50f16467eDD0D'

# Deploy the contract

```bash
cd solidity
npm install
```

Edit the truffle config with the network details

```bash
truffle deploy --network devnet
```

# Test the contract

Modify the file `test.js`, adding the private key of the account you will use on line 7.
At the bottom of the file, un-comment the function you wish to use, either `buyNew` or `sellNew`, each takes a string argument for the amount of tokens to transact, and will do a 1 for 1 trade of Aut > New or vice versa.

The smart contract has two view only functions that return the reserves of AUT and NEW, `autReserves` and `newtonReserves`. These are called in the funciton `getReserves` in `test.js`.


