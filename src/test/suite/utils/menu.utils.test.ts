import * as assert from 'assert'
import * as vscode from 'vscode'
import { isNodeWithCommand, loadJson } from '../../../utils/menu.utils'
import realMenu from '../../../assets/menu.json'

suite('Menu Utils Tests', () => {
  test('loadJson correctly loads and parses the menu JSON file', () => {
    const fakeContext = { extensionPath: '' }
    const menu = loadJson(fakeContext as unknown as vscode.ExtensionContext)

    assert.strictEqual(JSON.stringify(menu), JSON.stringify(realMenu))
  })

  test('isCommandWithDependency correctly identifies a CommandWithDependency object', () => {
    const commandObj = { command: 'some-command' }
    const frameworkObj = {}

    assert.strictEqual(isNodeWithCommand(commandObj), true)
    assert.strictEqual(isNodeWithCommand(frameworkObj), false)
  })
})
