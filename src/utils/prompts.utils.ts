import { getLangConfig } from './app.utils'

const languageConfig = getLangConfig()

function getLanguageConfig(key: string, defaultValue: string): string {
  return (languageConfig && languageConfig[key]) || defaultValue
}

export const getTechnologyPrompt = getLanguageConfig(
  'project-crafter.lang.selectTechnology',
  'Select the technology for your project',
)

export const getTerminalName = getLanguageConfig(
  'project-crafter.lang.terminalName',
  'Project Crafter Terminal',
)

export const getFolderPathMessage = getLanguageConfig(
  'project-crafter.lang.folderPath',
  'Do you want to select a specific folder for your project?',
)

export const getYesOption = getLanguageConfig(
  'project-crafter.lang.folderPath.yes',
  'Yes',
)

export const getNoOption = getLanguageConfig(
  'project-crafter.lang.folderPath.no',
  'No',
)

export const getProjectNamePrompt = getLanguageConfig(
  'project-crafter.lang.projectName',
  'Enter the name of your project',
)

export const getSelectPrompt = getLanguageConfig(
  'project-crafter.lang.select',
  'Select',
)

export const getSelectAnOptionPrompt = getLanguageConfig(
  'project-crafter.lang.selectAnOption',
  'Select an option',
)

export const getDependencyNotFoundMessage = getLanguageConfig(
  'project-crafter.lang.dependencyNotFoundMessage',
  'Dependency not found: {0}. Please install it from {1}',
)
