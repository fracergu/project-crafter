import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'
import { Menu } from './models/menu.model'
import { traverseOptions, verifyTechnologyDependency } from './utils/menu.utils'
import { askForProjectName, selectProjectDirectory } from './utils/app.utils'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'project-crafter.createProject',
    async () => {
      const menuPath = path.join(context.extensionPath, 'data', 'menu.json')
      const menuJson = fs.readFileSync(menuPath, 'utf8')
      const menu: Menu = JSON.parse(menuJson)

      const selectedTechnology = await vscode.window.showQuickPick(
        Object.keys(menu.technologies),
        {
          placeHolder: 'Select the technology for your project',
        },
      )
      if (!selectedTechnology) return

      const technology = menu.technologies[selectedTechnology]
      if (!(await verifyTechnologyDependency(technology.dependency))) return

      const command = await traverseOptions(technology.frameworks)
      if (!command) return

      const projectName = await askForProjectName()

      const projectDirectory = await selectProjectDirectory()
      if (!projectDirectory) return

      const finalCommand = `cd ${projectDirectory} && ${command.replace(
        '${projectName}',
        projectName,
      )}`
      const terminal = vscode.window.createTerminal({
        name: 'Project Crafter Terminal',
      })
      terminal.show()
      terminal.sendText(finalCommand)
    },
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
