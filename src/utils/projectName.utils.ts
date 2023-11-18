import * as vscode from 'vscode'

export async function getProjectName(): Promise<string> {
  const defaultProjectName = 'my-project'
  // Solicitar al usuario el nombre del proyecto
  const projectName = await vscode.window.showInputBox({
    prompt: 'Enter the name of your project, my-project is the default',
    placeHolder: defaultProjectName,
  })

  // Si el usuario presiona Tab, usa el nombre predeterminado
  if (
    vscode.window.activeTextEditor &&
    vscode.window.activeTextEditor.selection.isEmpty
  ) {
    return defaultProjectName
  }

  // Devuelve el nombre del proyecto ingresado por el usuario
  return projectName || defaultProjectName
}
