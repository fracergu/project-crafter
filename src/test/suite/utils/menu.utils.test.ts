import * as assert from 'assert'
import * as vscode from 'vscode'
import * as fs from 'fs'
import sinon from 'sinon'
import { isCommandWithDependency, loadJson } from '../../../utils/menu.utils'

suite('Menu Utils Tests', () => {
  test('loadJson correctly loads and parses the menu JSON file', () => {
    const fakeContext = { extensionPath: 'fake/path' }
    const fakeJson = JSON.stringify({ technologies: { Node: {} } })

    const readFileSyncStub = sinon.stub(fs, 'readFileSync').returns(fakeJson)

    const menu = loadJson(fakeContext as unknown as vscode.ExtensionContext)
    assert.deepStrictEqual(menu, { technologies: { Node: {} } })

    readFileSyncStub.restore()
  })

  test('isCommandWithDependency correctly identifies a CommandWithDependency object', () => {
    const commandObj = { command: 'some-command' }
    const frameworkObj = {}

    assert.strictEqual(isCommandWithDependency(commandObj), true)
    assert.strictEqual(isCommandWithDependency(frameworkObj), false)
  })
})
