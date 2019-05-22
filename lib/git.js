const gitAdd = (workingDirectory, files) => {
  return require("simple-git")(workingDirectory)
    .silent(true)
    .add(files);
};

const gitInit = async workingDirectory => {
  const git = require("simple-git")(workingDirectory).silent(true);
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    await git.init(false);
  }
};

const gitClone = (gitUri, outputPath, workingDirectory) => {
  return require("simple-git")(workingDirectory)
    .silent(true)
    .clone(gitUri, outputPath);
};

const gitFetch = (repositoryPath) => {
  return require("simple-git")(repositoryPath)
    .silent(true)
    .fetch();
};

const gitCheckout = (repositoryPath, checkoutWhat) => {
  return require("simple-git")(repositoryPath)
    .silent(false)
    .checkout(checkoutWhat);
};

module.exports = {
  gitAdd,
  gitClone,
  gitInit,
  gitCheckout,
  gitFetch
};
