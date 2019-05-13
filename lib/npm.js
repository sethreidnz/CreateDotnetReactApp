const util = require("util");
const exec = util.promisify(require("child_process").exec);

const installNpmPackages = async (path, packages) => {
  let npmInstallCommand = "npm install ";
  packages.forEach(package => {
    npmInstallCommand = `${npmInstallCommand} ${package} `;
  });
  console.log(`Running npm install command '${npmInstallCommand}' in the directory '${path}'`);
  const { stdout, stderr } = await exec(npmInstallCommand, {
    cwd: path
  });
  if (stderr) {
    console.log(
      "Finished running npm install with the following errors \n",
      stderr
    );
  }
  console.log(`Finished running npm install in the directory '${path}'`, stdout);
};

module.exports = {
  installNpmPackages
};
