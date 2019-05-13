const fs = require("fs-extra");
var path = require("path");
const util = require("util");
const kebabCase = require("lodash/kebabCase");
const exec = util.promisify(require("child_process").exec);

const { removeDirectoryIfExists } = require("./utility");

const createReactApp = async (name, outputFolder, clientAppPath) => {

  const tempCreateReactAppPath = path.join(outputFolder, kebabCase(name));
  removeDirectoryIfExists(tempCreateReactAppPath)

  const finalOutputPath = path.join(outputFolder, clientAppPath);
  removeDirectoryIfExists(finalOutputPath)

  const createReactAppCommand = `create-react-app ${tempCreateReactAppPath}`;
  console.log(`Running create-react-app command: ${createReactAppCommand}`);
  const { stdout, stderr } = await exec(createReactAppCommand);
  if (stderr) {
    console.log(
      "Finished running create-react-app with following errors",
      stderr
    );
  }
  fs.renameSync(tempCreateReactAppPath, finalOutputPath);
  console.log("Finished create-react-app command:", stdout);
};

module.exports = {
  createReactApp
};
