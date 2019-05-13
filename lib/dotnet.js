const util = require("util");
const exec = util.promisify(require("child_process").exec);
var path = require("path");

const generateBaseSolution = async (name, outputPath) => {
  const solutionFilePath = await dotnetNewSolution(name, outputPath);
  const projectName = `${name}.Web`;
  const projectFolderPath = await dotnetNew(projectName, outputPath);
  const projectFilePath = path.join(projectFolderPath, `${projectName}.csproj`,);
  await dotnetAddProjectToSolution(solutionFilePath, projectFilePath);
  return projectFolderPath;
}

const dotnetNew = async (name, outputPath) => {
  const projectFolderPath = path.join(outputPath, name);
  const dotnetCommand = `dotnet new react -n ${name} -o ${projectFolderPath}`;
  console.log(`Running dotnet command: ${dotnetCommand}`);
  const { stdout, stderr } = await exec(dotnetCommand);
  if (stderr) {
    throw new Error(stderr);
  }
  console.log("Finished dotnet command:", stdout);
  return projectFolderPath
};

const dotnetNewSolution = async (name, outputPath) => {
  const dotnetCommand = `dotnet new sln -o ${outputPath} -n ${name}`;
  console.log(`Running dotnet command: ${dotnetCommand}`);
  const { stdout, stderr } = await exec(dotnetCommand);
  if (stderr) {
    throw new Error(stderr);
  }
  console.log("Finished dotnet command:", stdout);
  return path.join(outputPath, `${name}.sln`,)
};

const dotnetAddProjectToSolution = async (solutionFilePath, projectFilePath) => {
  const dotnetCommand = `dotnet sln ${solutionFilePath} add ${projectFilePath}`;
  console.log(`Running dotnet command: ${dotnetCommand}`);
  const { stdout, stderr } = await exec(dotnetCommand);
  if (stderr) {
    throw new Error(stderr);
  }
  console.log("Finished dotnet command:", stdout);
};

module.exports = {
  dotnetNew,
  generateBaseSolution
};
