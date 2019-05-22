const fs = require("fs-extra");
var path = require("path");
const replace = require("replace-in-file");

const { removeDirectoryIfExists } = require("./lib/utility");
const { gitClone, gitInit, gitCheckout, gitFetch } = require("./lib/git");
const { generateBaseSolution } = require("./lib/dotnet");
const { createReactApp } = require("./lib/create-react-app");
const { installNpmPackages } = require("./lib/npm");
const buildDirectory = "build";

const createDotnetReactApp = async (
  name,
  outputFolder,
  sourceGithubUri,
  workingDirectory,
  branch = null
) => {
  // constants
  const solutionOutputPath = path.join(outputFolder, name);
  const dotnetSolutionDirectory = path.join(solutionOutputPath, "src");
  const buildFolderPath = path.resolve(buildDirectory);
  const sourceCloneOutputPath = path.join(buildFolderPath, name);

  console.log("Cleaning and initalizing the repository");
  // clean the staging areas
  await clean(buildFolderPath, outputFolder, solutionOutputPath);

  console.log("Initializing git repository");
  // initialize a git repo in the output folder
  await gitInit(solutionOutputPath);

  console.log("Cloning source repository");
  // clone the latest of this repository to a temporary folder
  await gitClone(sourceGithubUri, sourceCloneOutputPath, workingDirectory);

  if (branch && branch !== "master") {
    console.log(`Checking out branch ${branch}`);
    await gitFetch();
    await gitCheckout(sourceCloneOutputPath, branch);
  }

  const templateManifest = getTemplateManifest(sourceCloneOutputPath);

  // create the new dotnet project
  const webProjectDirectory = await generateBaseSolution(
    name,
    dotnetSolutionDirectory
  );
  const clientAppDirectory = path.join(
    webProjectDirectory,
    templateManifest.clientAppPath
  );

  // create the new create react app
  await createReactApp(
    name,
    webProjectDirectory,
    templateManifest.clientAppPath
  );

  // // update with the template
  await updateWithTemplate(
    name,
    solutionOutputPath,
    webProjectDirectory,
    sourceCloneOutputPath,
    templateManifest
  );

  // install npm packages
  await installNpmPackages(
    clientAppDirectory,
    templateManifest.npmPackagesToInstall
  );

  await removeDirectoryIfExists(buildDirectory);
};

const updateWithTemplate = async (
  name,
  outputFolderPath,
  webProjectDirectory,
  sourceCloneOutputPath,
  templateManifest
) => {
  const clientSrcPath = path.join(
    webProjectDirectory,
    templateManifest.clientAppPath,
    "src"
  );

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
  const regex = new RegExp(templateManifest.name, "g");
  const options = {
    files: [`${outputFolderPath}/**/*`, `${outputFolderPath}/.vscode/*.json`],
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

const getTemplateManifest = sourceCloneOutputPath => {
  return require(path.join(sourceCloneOutputPath, "template", "manifest.json"));
};

const clean = async (tempFolderPath, outputFolder, solutionOutputPath) => {
  // clean/create temp folder
  await removeDirectoryIfExists(tempFolderPath);
  fs.mkdirSync(tempFolderPath);

  // create output folders
  await removeDirectoryIfExists(outputFolder);
  fs.mkdirSync(outputFolder);
  await removeDirectoryIfExists(solutionOutputPath);
  fs.mkdirSync(solutionOutputPath);
  const internalSrcFolder = path.join(solutionOutputPath, `/src`);
  fs.mkdirSync(internalSrcFolder);
};

module.exports = {
  createDotnetReactApp
};
