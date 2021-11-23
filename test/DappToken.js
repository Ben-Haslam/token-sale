const DappToken = artifacts.require("DappToken");

contract('DappToken', (accounts) => {
    let tokenInstance;

    it('Token setup correctly', async() => {
        tokenInstance =  await DappToken.deployed();
        const totalSupply = await tokenInstance.totalSupply();
        assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');

        const adminBalance = await tokenInstance.balanceOf(accounts[0]);
        assert.equal(adminBalance.toNumber(), 1000000, 'It allocates the initial supply')

        const tokenName = await tokenInstance.name();
        assert.equal(tokenName, "DApp Token", 'It has the right name')

        const tokenSymbol = await tokenInstance.symbol();
        assert.equal(tokenSymbol, "DAPP", 'It has the right symbol')        
        });

    it('transfers token ownership', async() => {
        tokenInstance =  await DappToken.deployed();
        tokenInstance.transfer.call(accounts[1], 1000001).catch((error)=> {
            assert (error.message.indexOf('revert') >= 0, 'error message must contain revert');
        });
        const balance_old = await tokenInstance.balanceOf(accounts[1]);
        const receipt = await tokenInstance.transfer(accounts[1], 2500, {from: accounts[0]});
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
        assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
        assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
        assert.equal(receipt.logs[0].args._value, 2500, 'logs the transfer amount');

        const balance_new = await tokenInstance.balanceOf(accounts[1]);
        assert.equal((balance_new.toNumber() - balance_old.toNumber()), 2500);
    });

    it('approves tokens for deligated transfer', async() =>{
        tokenInstance =  await DappToken.deployed();
        const success = await tokenInstance.approve.call(accounts[1], 100);
        assert.equal(success, true, 'it strikes true')

        const receipt = await tokenInstance.approve(accounts[1], 100);
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Approval" event');
        assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are approved from');
        assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are approved to');
        assert.equal(receipt.logs[0].args._value, 100, 'logs the approval amount');

        const allowance = await tokenInstance.allowance(accounts[0], accounts[1]);
        assert.equal(allowance, 100, 'The right amount has been approved');
    });

    it('Does a deligated transfer', async() =>{
        tokenInstance =  await DappToken.deployed();
        const success = await tokenInstance.transferFrom.call(accounts[0], accounts[1], 100, { from: accounts[1] });
        assert.equal(success, true, 'it strikes true')

        const balance_old = await tokenInstance.balanceOf(accounts[1]);
        const receipt = await tokenInstance.transferFrom(accounts[0], accounts[1], 100, {from: accounts[1]});
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
        assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
        assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
        assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');

        const balance_new = await tokenInstance.balanceOf(accounts[1]);
        assert.equal((balance_new.toNumber() - balance_old.toNumber()), 100);
        
    });
});