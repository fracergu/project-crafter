import * as vscode from 'vscode'
import {
  loadJson,
  traverseOptions,
  verifyTechnologyDependency,
} from './utils/menu.utils'
import { askForProjectName, selectProjectDirectory } from './utils/app.utils'
import { getTechnologyPrompt, getTerminalName } from './utils/prompts.utils'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'project-crafter.createProject',
    async () => {
      const menu = loadJson(context)

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
    },
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {
  // Lógica de desactivación si es necesario
}
