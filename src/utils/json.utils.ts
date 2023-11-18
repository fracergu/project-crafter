import * as path from 'path'
import * as fs from 'fs'
import * as vscode from 'vscode'
import { Menu } from '../models/menu.model'

export const loadJson = (context: vscode.ExtensionContext): Menu => {
  const menuPath = path.join(context.extensionPath, 'data', 'menu.json')
  const menuJson = fs.readFileSync(menuPath, 'utf8')
  const menu: Menu = JSON.parse(menuJson)
  return menu
}
