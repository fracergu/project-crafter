import * as vscode from 'vscode'
import { FrameworkOptions } from './models/menu.model'
import { loadJson } from './utils/json.utils'
import { verifyTechnologyDependency } from './utils/dependencies.utils'
import { getProjectName } from './utils/projectName.utils'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'project-crafter.createProject',
    async () => {
      const menu = loadJson(context)

      // Mostrar QuickPick con tecnologías
      const technologies = Object.keys(menu.technologies)
      const selectedTechnology = await vscode.window.showQuickPick(
        technologies,
        {
          placeHolder: 'Select the technology for your project',
        },
      )

      if (!selectedTechnology) {
        return
      }

      const technology = menu.technologies[selectedTechnology]

      // Verify package manager
      const isPackageManagerInstalled = await verifyTechnologyDependency(
        technology.dependency,
      )
      if (!isPackageManagerInstalled) {
        return
      }

      const frameworks = Object.keys(technology.frameworks)

      // Show QuickPick with frameworks
      const selectedFramework = await vscode.window.showQuickPick(frameworks, {
        placeHolder: `Choose a ${selectedTechnology} framework`,
      })

      if (!selectedFramework) {
        return
      }

      const frameworkOptions = technology.frameworks[selectedFramework]

      // Función para manejar opciones anidadas
      async function handleFrameworkOptions(
        options: FrameworkOptions,
      ): Promise<string> {
        if (typeof options === 'string') {
          return options
        }

        const subOptions = Object.keys(options)
        const selectedSubOption = await vscode.window.showQuickPick(
          subOptions,
          {
            placeHolder: 'Select an option',
          },
        )

        if (!selectedSubOption) {
          return ''
        }

        // Asegurar que la opción seleccionada sea de tipo FrameworkOptions antes de la llamada recursiva
        const nextOptions = options[selectedSubOption]
        if (typeof nextOptions === 'string') {
          return nextOptions
        } else {
          return handleFrameworkOptions(nextOptions)
        }
      }

      // Obtener el comando final
      const command = await handleFrameworkOptions(frameworkOptions)
      if (!command) {
        return
      }

      // Obtener el nombre del proyecto
      const projectName = await getProjectName()

      // Reemplazar el marcador de posición con el nombre del proyecto
      const finalCommand = command.replace('${projectName}', projectName)

      // Ejecutar el comando en un terminal de VS Code
      const terminal = vscode.window.createTerminal({
        name: 'Project Crafter Terminal',
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
