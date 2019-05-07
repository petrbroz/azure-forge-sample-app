# azure-forge-sample-app

Sample [Forge](https://forge.autodesk.com)/Node.js application prepared for deployment
to [Microsoft Azure](https://azure.microsoft.com).

## Prerequisites

- Microsoft Azure account
- Forge application credentials ([How to create a Forge application](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/create-app))
- [Visual Studio Code](https://code.visualstudio.com) with the following extensions:
  - [Azure Account](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)
  - [Azure Storage](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage)
  - [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)

> For more information about the Azure integration in Visual Studio Code,
> see https://code.visualstudio.com/tutorials/functions-extension/getting-started
> and https://code.visualstudio.com/tutorials/static-website/getting-started

## Deployment

- Create a new Azure setup using _deployment/template.json_,
and entering your Forge application credentials
- Deploy this project to Azure Functions, for example, by right-clicking
the Azure Functions application in sidebar and selecting _Deploy to Function App..._
- Update the `API_HOST` const in _public/viewer.js_ to point to your Azure Function
- Deploy the _public_ subfolder to Azure Storage, for example, by right-clicking
the folder in sidebar and selecting _Deploy to Static Website..._

> TODO: link to blog post explaining all the steps in detail
