var Interact = artifacts.require("./Interact.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Interact, "Hello World");
};
