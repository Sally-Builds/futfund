const Base = artifacts.require("base.sol")

module.exports = function(deployer) {
    deployer.deploy(Base)
}