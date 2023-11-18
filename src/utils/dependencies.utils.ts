import { exec } from 'child_process'
import * as vscode from 'vscode'
import { TechnologyDependency } from '../models/menu.model'

export async function verifyTechnologyDependency(
  dependency: TechnologyDependency,
): Promise<boolean> {
  return new Promise((resolve) => {
    const { checkCommand, installationUrl, name } = dependency

    exec(checkCommand, (error) => {
      if (error) {
        vscode.window.showErrorMessage(
          `Dependency not found: ${name}. Please install it from ${installationUrl}`,
        )
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}
