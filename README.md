# Create .NET React App

This repository contains a Node.js command-line tool that automates the manual steps required when
setting up a fresh .NET Core app with a React frontend.

## Motivations

The purpose of this tool is not to define implementation details or architecture, but rather to provide a solid starting point for development that in it's use, guides best practices. This is always to be done as much as possible by using the tools provided by the libraries and platforms we are building on top of (e.g the `dotnet` CLI and `create-react-app`).

## Generating a project

To get started clone the repository:

> **Note**: It is recommended to clone into a folder with a name other than `create-dotnet-react-app` because that is the name of the executable we will be running and it can cause issues. Copy the command below to avoid this.

```
git clone https://github.com/sethreidnz/create-dotnet-react-app create-dotnet-react-app-source
```

Change directory into it and run the `npm link` command to install it locally.

```
cd create-dotnet-react-app
npm link
```

You can now run the tool on the command line. Try running the following to see the help menu:

```
create-dotnet-react-app --help
```

You should see the following output:

```
Options:
  -V, --version                   output the version number
  -n --projectName <projectName>  The project name in camel case e.g. [MyProjectName]
  -o, --output [output]           The folder to output the project into. Defaults to the current directory.
  -h, --help                      output usage information
```

## What does it do?

Current the steps are as follows:

- Create new folder and initialize a git repository
- Create a new .NET core solution and web app with the `dotnet` command line
- Delete the ClientApp in the `dotnet new react` template and regenerate with `create-react-app` (the React CLI)
- Copy over some template files from the template folder. See [the template manifest file](template\manifest.json) for which.
- Replace the project name from the copies template
- Install additional packages

## Recipes

We also have what are called 'recipes' which are configurations or changes you will want to make in specific projects but have not yet made their way into the default output. Feel free to add new recipes vis pull request.

- [How to add Roslyn code analysers](recipes/adding-roslyn-analysers.md)