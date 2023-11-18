import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'
import { Menu } from './models/menu.model'
import { traverseOptions, verifyTechnologyDependency } from './utils/menu.utils'
import { askForProjectName, selectProjectDirectory } from './utils/app.utils'
import { getTechnologyPrompt, getTerminalName } from './utils/prompts.utils'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'project-crafter.createProject',
    async () => {
      const menuPath = path.join(
        context.extensionPath,
        'src/assets',
        'menu.json',
      )
      const menuJson = fs.readFileSync(menuPath, 'utf8')
      const menu: Menu = JSON.parse(menuJson)

      const selectedTechnology = await vscode.window.showQuickPick(
        Object.keys(menu.technologies),
        {
          placeHolder: getTechnologyPrompt,
        },
      )
      if (!selectedTechnology) return

      const technology = menu.technologies[selectedTechnology]
      if (!(await verifyTechnologyDependency(technology.dependency))) return

      const command = await traverseOptions(technology.frameworks)
      if (!command) return

      const projectName = await askForProjectName()

      const projectDirectory = await selectProjectDirectory()
      let finalCommand = command.replace('${projectName}', projectName)

      if (projectDirectory) {
        finalCommand = `cd ${projectDirectory} && ${command.replace(
          '${projectName}',
          projectName,
        )}`
      }

      const terminal = vscode.window.createTerminal({
        name: getTerminalName,
      })
      terminal.show()
      terminal.sendText(finalCommand)

      // Luego, abre el Webview
      const panel = vscode.window.createWebviewPanel(
        'extensionInformation',
        'Información de la Extensión',
        vscode.ViewColumn.One,
        {},
      )

      // Contenido HTML del webview
      panel.webview.html = getWebviewContent()
    },
  )

  context.subscriptions.push(disposable)
}

function getWebviewContent() {
  // Contenido HTML del webview
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              /* Estilos CSS aquí */
          </style>
      </head>
      <body>
          <h1>Información de la Extensión</h1>
          <p>Descripción de la extensión y más información...</p>
      </body>
      </html>
  `
}

export function deactivate() {
  // Lógica de desactivación si es necesario
}
