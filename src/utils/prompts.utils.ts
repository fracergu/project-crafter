import * as vscode from 'vscode'
import { getLangConfig } from './app.utils'

const languageConfig = getLangConfig()

export const getTechnologyPrompt = vscode.workspace
  .getConfiguration()
  .get(
    'project-crafter.lang.selectTechnology',
    'Select the technology for your project',
  )

export const getTerminalName = vscode.workspace
  .getConfiguration()
  .get('project-crafter.lang.terminalName', 'Project Crafter Terminal')

export const getFolderPathMessage = vscode.workspace
  .getConfiguration()
  .get(
    'project-crafter.lang.folderPath',
    'Do you want to select a specific folder for your project?',
  )

export const getYesOption = vscode.workspace
  .getConfiguration()
  .get('project-crafter.lang.folderPath.yes', 'Yes')

export const getNoOption = vscode.workspace
  .getConfiguration()
  .get('project-crafter.lang.folderPath.no', 'No')

export const getProjectNamePrompt = vscode.workspace
  .getConfiguration()
  .get('project-crafter.lang.projectName', 'Enter the name of your project')

export const getSelectPrompt =
  languageConfig['project-crafter.lang.select'] ?? 'Select'

export const getSelectAnOptionPrompt =
  languageConfig['project-crafter.lang.selectAnOption'] ?? 'Select an option'

export const getDependencyNotFoundMessage = vscode.workspace
  .getConfiguration()
  .get(
    'project-crafter.lang.dependencyNotFoundMessage',
    'Dependency not found: {0}. Please install it from {1}',
  )
