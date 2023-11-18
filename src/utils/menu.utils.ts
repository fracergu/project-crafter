import { exec } from 'child_process'
import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'

import {
  CommandWithDependency,
  FrameworkOptions,
  Menu,
  TechnologyDependency,
} from '../models/menu.model'

/**
 * Loads and parses the JSON file containing the menu configurations.
 * This function is responsible for reading the 'menu.json' file,
 * which includes the definitions of technologies, their dependencies, and frameworks.
 * The function synchronously reads the JSON file and converts it into a Menu object.
 *
 * @param context - The extension context provided by VSCode, used to locate the 'menu.json' file.
 * @returns The parsed Menu object containing the structure of technologies and their associated options.
 */
export const loadJson = (context: vscode.ExtensionContext): Menu => {
  const menuPath = path.join(context.extensionPath, 'src/assets', 'menu.json')
  const menuJson = fs.readFileSync(menuPath, 'utf8')
  const menu: Menu = JSON.parse(menuJson)
  return menu
}

/**
 * Verifies if a given technology dependency is installed in the system.
 * It executes the checkCommand associated with the dependency,
 * and if it fails, it shows an error message with a link to install the dependency.
 *
 * @param dependency - The technology dependency to be checked.
 * @returns A promise that resolves to true if the dependency is satisfied, false otherwise.
 */
export const verifyTechnologyDependency = async (
  dependency: TechnologyDependency,
): Promise<boolean> =>
  new Promise((resolve) => {
    exec(dependency.checkCommand, (error) => {
      if (error) {
        vscode.window.showErrorMessage(
          `Dependency not found: ${dependency.name}. Please install it from ${dependency.installationUrl}`,
        )
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })

/**
 * Type guard function to check if an object is of the type CommandWithDependency.
 * It verifies if the object has a 'command' property, indicating it's not just a string or nested FrameworkOptions.
 *
 * @param obj - The object to be checked.
 * @returns True if the object is a object with a 'command' property, false otherwise.
 */
export const isNodeWithCommand = (
  obj: CommandWithDependency | FrameworkOptions,
): obj is CommandWithDependency => {
  return obj && typeof obj === 'object' && 'command' in obj
}

/**
 * Recursively traverses the options of frameworks and their sub-options.
 * It presents the user with a QuickPick selection at each level.
 * If an option is a string, it returns it as the command.
 * If an option is a CommandWithDependency, it verifies the dependency before returning the command.
 * If an option is a nested FrameworkOptions object, it recursively calls itself.
 *
 * @param options - The current level of framework options to traverse.
 * @returns A promise that resolves to the final command string to execute, or an empty string if the process is exited prematurely.
 */
export const traverseOptions = async (
  options: FrameworkOptions,
): Promise<string> => {
  const selectedOption = await vscode.window.showQuickPick(
    Object.keys(options),
    {
      placeHolder: 'Select an option',
    },
  )
  if (!selectedOption) return ''

  const nextOptions = options[selectedOption]
  if (typeof nextOptions === 'string') {
    return nextOptions
  } else if (isNodeWithCommand(nextOptions)) {
    if (
      nextOptions.dependency &&
      !(await verifyTechnologyDependency(nextOptions.dependency))
    ) {
      return ''
    }
    return nextOptions.command
  } else {
    return traverseOptions(nextOptions)
  }
}
