# Adding Roslyn Analysers

In order to add Roslyn Analysers to the project follow these steps:

1. Install the required packages

        ```bash
        cd src/ProjeCreateDotnetReactAppctName.Web
        dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Tools
        dotnet add package Microsoft.CodeAnalysis.FxCopAnalyzers
        dotnet add package StyleCop.Analyzers
        dotnet add package System.Runtime.Analyzers
        dotnet add package System.Runtime.InteropServices.Analyzers
        dotnet add package System.Security.Cryptography.Hashing.Algorithms.Analyzers
        dotnet add package Desktop.Analyzers
        ```

2. Ensure the file `src/Rules.ruleset` exists (it should be if you generated the project using `create-dotnet-react-app` otherwise copy it from `template/src/Rules.ruleset`).

3. Add the following to the web project file which will be found in: `src/CreateDotnetReactApp.Web/CreateDotnetReactApp.Web.csproj`

        ```xml
        <PropertyGroup>
            <TreatWarningsAsErrors>True</TreatWarningsAsErrors>
            <TreatSpecificWarningsAsErrors />
            <CodeAnalysisRuleSet>..\Rules.ruleset</CodeAnalysisRuleSet>
        </PropertyGroup>
        ```

> **Note:** The default rules from within StylCop change from time to time, so you may need to ignore new rules that are not ignored in the current Ruleset file. If you find this, please do a PR against the `template` in this project to rectify for future projects.