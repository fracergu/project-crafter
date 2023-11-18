import { exec } from 'child_process'
import * as vscode from 'vscode'
import {
  CommandWithDependency,
  FrameworkOptions,
  TechnologyDependency,
} from '../models/menu.model'

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

export const isCommandWithDependency = (
  obj: CommandWithDependency | FrameworkOptions,
): obj is CommandWithDependency => {
  return obj && typeof obj === 'object' && 'command' in obj
}

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
  } else if (isCommandWithDependency(nextOptions)) {
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
