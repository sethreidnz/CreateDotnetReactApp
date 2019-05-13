const fs = require("fs-extra");
var path = require("path");
const replace = require("replace-in-file");

const { removeDirectoryIfExists  } = require("./lib/utility");
const { gitClone, gitInit } = require("./lib/git");
const { generateBaseSolution } = require("./lib/dotnet");
const { createReactApp } = require("./lib/create-react-app");
const { installNpmPackages } = require("./lib/npm");
const tempDirectory = "temp";

const createDotnetReactApp = async (
  name,
  outputFolder,
  sourceGithubUri,
  workingDirectory
) => {
  // constants
  const outputFolderPath = path.join(outputFolder, name);
  const dotnetSolutionDirectory = path.join(outputFolderPath, "src");
  const tempFolderPath = path.resolve(tempDirectory);
  const sourceCloneOutputPath = path.join(tempFolderPath, name);

  console.log("Cleaning and initalizing the repository")
  // clean the staging areas
  await clean(tempFolderPath, outputFolderPath);

  console.log("Initializing git repository")
  // initialize a git repo in the output folder
  await gitInit(outputFolderPath);

  console.log("Cloning source repository")
  // clone the latest of this repository to a temporary folder
  await gitClone(sourceGithubUri, sourceCloneOutputPath, workingDirectory);

  const templateManifest = getTemplateManifest(sourceCloneOutputPath);

  // create the new dotnet project
  const webProjectDirectory = await generateBaseSolution(name, dotnetSolutionDirectory);
  const clientAppDirectory = path.join(webProjectDirectory, templateManifest.clientAppPath)

  // create the new create react app
  await createReactApp(name, webProjectDirectory, templateManifest.clientAppPath);

  // // update with the template
  await updateWithTemplate(
    name,
    outputFolderPath,
    webProjectDirectory,
    sourceCloneOutputPath,
    templateManifest
  );

  // install npm packages
  await installNpmPackages(clientAppDirectory, templateManifest.npmPackagesToInstall);

  await removeDirectoryIfExists(tempDirectory);
};

const updateWithTemplate = async (
  name,
  outputFolderPath,
  webProjectDirectory,
  sourceCloneOutputPath,
  templateManifest
) => {
  const clientSrcPath = path.join(webProjectDirectory, templateManifest.clientAppPath, "src");

  // create array of file source and destinations from the manifest file
  const filesToCopy = templateManifest.filesToCopy.map(file => {
    return {
      source: path.join(sourceCloneOutputPath, "template", file),
      destination: path.join(
        outputFolderPath,
        file.replace(templateManifest.name, name)
      )
    };
  });

  // remove the client src folder in the output
  await removeDirectoryIfExists(clientSrcPath);

  // copy target files
  await Promise.all(
    filesToCopy.map(async item => await fs.copy(item.source, item.destination))
  );

  // replace original template name in the output
  const regex = new RegExp(templateManifest.name, 'g');
  const options = {
    files: [
      `${outputFolderPath}/**/*`,
      `${outputFolderPath}/.vscode/*.json`
    ],
    ignore: [
      `${webProjectDirectory}/ClientApp/node_modules/**/*`,
      `${webProjectDirectory}/bin/**/*`,
      `${webProjectDirectory}/obj/**/*`
    ],
    from: regex,
    to: name
  };
  await replace(options);
};

const getTemplateManifest = (sourceCloneOutputPath) => {
  return require(path.join(
    sourceCloneOutputPath,
    "template",
    "manifest.json"
  ));
}

const clean = async (tempFolderPath, outputFolderPath) => {
  // clean/create temp folder
  await removeDirectoryIfExists(tempFolderPath);
  fs.mkdirSync(tempFolderPath);

  // create output folders
  await removeDirectoryIfExists(outputFolderPath);
  fs.mkdirSync(outputFolderPath);

  const internalSrcFolder = path.join(outputFolderPath, `/src`);
  fs.mkdirSync(internalSrcFolder);
};

module.exports = {
  createDotnetReactApp
};
