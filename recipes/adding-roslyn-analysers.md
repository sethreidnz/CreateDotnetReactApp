# Adding Roslyn Analysers

In order to add Roslyn Analysers to the project follow these steps:

1. Install the required packages

```bash
cd src/ProjectName.Web
dotnet add ProjectName.Web.csproj package System.Runtime.Analyzers 
dotnet add ProjectName.Web.csproj package System.Runtime.InteropServices.Analyzers
dotnet add ProjectName.Web.csproj package System.Security.Cryptography.Hashing.Algorithms.Analyzers
dotnet add ProjectName.Web.csproj package Desktop.Analyzers
```

2. Ensure the file `src/Rules.ruleset` exists (it should be if you generated the project using `create-dotnet-react-app` otherwise copy it from `template/src/Rules.ruleset`).

3. Add the following to the project folder which will be found in: `src/ProjectName.Web/ProjectName.Web.csproj`

```xml
<PropertyGroup>
    <TreatWarningsAsErrors>True</TreatWarningsAsErrors>
    <TreatSpecificWarningsAsErrors />
    <CodeAnalysisRuleSet>..\Rules.ruleset</CodeAnalysisRuleSet>
</PropertyGroup>
```