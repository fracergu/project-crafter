import * as vscode from 'vscode'

/**
 * Generates a whimsical and random name composed of three parts: an adjective, a color, and a noun.
 * This function selects one word randomly from each of the three predefined arrays (adjectives, colors, nouns)
 * to create a unique and funny name. Such names can be used as placeholders or default values where a
 * creative and non-generic identifier is needed. This approach adds a light-hearted and playful element,
 * potentially making the user interaction more engaging.
 *
 * @returns A string representing a randomly generated name in the format "adjective-color-noun".
 *          For example: "amazing-green-unicorn", "sleepy-pink-robot", etc.
 */
export const generateFunnyName = () => {
  const adjectives = [
    'amazing',
    'pretty',
    'giant',
    'mysterious',
    'shiny',
    'flying',
    'invisible',
    'tiny',
    'angry',
    'sleepy',
  ]
  const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'pink',
    'black',
    'white',
    'orange',
    'brown',
  ]
  const nouns = [
    'unicorn',
    'tortoise',
    'dragon',
    'spaceship',
    'robot',
    'ninja',
    'pirate',
    'alien',
    'monster',
    'zombie',
  ]

  const pickRandom = (list: string[]) =>
    list[Math.floor(Math.random() * list.length)]

  return `${pickRandom(adjectives)}-${pickRandom(colors)}-${pickRandom(nouns)}`
}

/**
 * Asks the user for the name of the project. If the user does not provide a name,
 * a funny placeholder name is used as the default project name.
 *
 * @param context - The extension context, can be used for additional configurations if needed.
 * @returns A promise that resolves to the name of the project, either entered by the user or the generated funny name.
 */
export const askForProjectName = async (): Promise<string> => {
  const funnyPlaceholder = generateFunnyName()

  const projectName = await vscode.window.showInputBox({
    prompt: 'Enter the name of your project',
    placeHolder: funnyPlaceholder,
  })

  return projectName || funnyPlaceholder
}

/**
 * Asks the user whether they want to select a specific directory for their project.
 * If the user chooses 'Yes', it shows a dialog to select a folder. If the user selects a folder,
 * the function returns the path of that folder. If the user chooses 'No' or does not select a folder,
 * the function returns undefined.
 *
 * @returns A promise that resolves to the selected directory's path or undefined.
 */
export const selectProjectDirectory = async (): Promise<string | undefined> => {
  const shouldSelectFolder = await vscode.window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Do you want to select a specific folder for your project?',
  })

  if (shouldSelectFolder !== 'Yes') {
    return undefined
  }

  const options: vscode.OpenDialogOptions = {
    canSelectMany: false,
    openLabel: 'Select',
    canSelectFolders: true,
    canSelectFiles: false,
  }

  const folderUri = await vscode.window.showOpenDialog(options)
  if (folderUri && folderUri.length > 0) {
    return folderUri[0].fsPath
  } else {
    return undefined
  }
}
