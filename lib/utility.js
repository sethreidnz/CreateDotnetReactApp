const rimraf = require("rimraf");
const fs = require("fs-extra");

const removeDirectoryIfExists = async path => {
  if (fs.existsSync(path)) {
    await removeDirectoryAsync(path);
  }
};

const createDirectoryIfDoesntExist = async path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const removeDirectoryAsync = path =>
  new Promise((resolve, reject) => {
    rimraf(
      path,
      () => {
        resolve();
      },
      error => {
        reject(error);
      }
    );
  });

const isCamelCase = str => {
  return /[A-Z]/.test(str);
};

module.exports = {
  removeDirectoryAsync,
  removeDirectoryIfExists,
  createDirectoryIfDoesntExist,
  isCamelCase
};
