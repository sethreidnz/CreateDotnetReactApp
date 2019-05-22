#! /usr/bin/env node

// node_modules
const fs = require("fs-extra");
var program = require("commander");
var path = require("path");
const chalk = require("chalk");

// local imports
const packageJson = require("./package.json");
const { createDotnetReactApp } = require("./createDotnetReactApp");
const { isCamelCase } = require("./lib/utility");

// constants
const sourceGithubUri = packageJson.repository.url;
const workingDir = path.resolve("./");

// setup command line
program
  .version(packageJson.version)
  .option(
    "-n --projectName <projectName>",
    "The project name in camel case e.g. [MyProjectName]"
  )
  .option(
    "-o, --output [output]",
    "The folder to output the project into. Defaults to the current directory."
  )

  .option(
    "-b, --branch [output]",
    "The branch to use when cloning the repository, defaults to master."
  )
  .parse(process.argv);

// command-line options
let projectName = program.projectName;
let outputFolder = program.output ? program.output : "./";
let branch = program.branch ? program.branch : null;

// validate the name
if (!projectName) {
  console.log(
    chalk.red(
      "You must specify a solution name with the flag -n [projectName] or --projectName [projectName]"
    )
  );
  process.exit();
} else if (!isCamelCase(projectName)) {
  console.log(chalk.red("The [projectName] parameter must be in CamelCase"));
}

const solutionOutputPath = path.join(outputFolder, projectName);

// validate output folder exists
if (!fs.existsSync(outputFolder)) {
  console.log(chalk.red("Parameter [output] folder is not a valid directory"));
}

// validate we can create a new solution in the folder with the name
if (fs.existsSync(solutionOutputPath)) {
  console.log(
    chalk.red(
      `Cannot create new solution in directory it already exists '${solutionOutputPath}'`
    )
  );
  process.exit();
}

if (fs.existsSync(path.join(outputFolder, projectName))) {
  console.log(
    chalk.red(
      `Cannot create new solution in directory it already exists '${solutionOutputPath}'`
    )
  );
  process.exit();
}

createDotnetReactApp(projectName, outputFolder, sourceGithubUri, workingDir, branch)
  .then(() => console.log("Project Generated"))
  .catch(error => console.error(error));
