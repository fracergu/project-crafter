import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'project-crafter.createProject',
    async () => {
      const technology = await vscode.window.showQuickPick(['Node', 'Rust'], {
        placeHolder: 'Select the technology for your project',
      })

      if (technology === 'Node') {
        await vscode.window.showQuickPick(['React', 'Angular', 'Vue', '...'], {
          placeHolder: 'Choose a Node.js framework',
        })

        // Here you can continue with the logic depending on the nodeFramework selection
      }
      // Implement similar logic for Rust if necessary
    },
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
