// var Owners = artifacts.require("./Owners.sol");
// var PermissionExtender = artifacts.require("./PermissionExtender.sol");
// var KYC = artifacts.require("./KYC.sol");
var Regulator = artifacts.require("./Regulator.sol");

// var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer) {
  // deployer.deploy(Registry);
  // deployer.deploy(GuaranteeConst);
  // deployer.deploy(GuaranteeExtender);
  // deployer.deploy(GuaranteeRequestExtender);
  // deployer.deploy(DigitalGuaranteeBNHP);
  deployer.deploy(Regulator);
  // deployer.deploy(KYC);
};
