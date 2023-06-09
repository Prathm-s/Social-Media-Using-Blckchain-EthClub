const PostContract = artifacts.require("PostContract");

module.exports = function (deployer) {
  deployer.deploy(PostContract);
};
