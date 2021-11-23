module.exports = function(deployer) {
  deployer.deploy(artifacts.require("DappToken"), 1000000);
};
