import * as assert from 'assert'
import * as vscode from 'vscode'
import { askForProjectName, generateFunnyName } from '../../../utils/app.utils'
import sinon from 'sinon'

suite('App Utils Tests', () => {
  test('generateFunnyName returns a string', () => {
    const name = generateFunnyName()
    assert.strictEqual(typeof name, 'string')
  })

  test('generateFunnyName returns a name in expected format', () => {
    const name = generateFunnyName()
    assert.match(name, /^[a-z]+-[a-z]+-[a-z]+$/i)
  })

  test('askForProjectName returns inserted name', async () => {
    const stub = sinon.stub(vscode.window, 'showInputBox').resolves('MyProject')
    const projectName = await askForProjectName()
    assert.strictEqual(projectName, 'MyProject')
    stub.restore()
  })

  test('askForProjectName returns generated name when no name is inserted', async () => {
    const stub = sinon.stub(vscode.window, 'showInputBox').resolves(undefined)
    const projectName = await askForProjectName()
    assert.match(projectName, /^[a-z]+-[a-z]+-[a-z]+$/i)
    stub.restore()
  })

  test('selectFolder returns a valid folder when selected', async () => {
    const stub = sinon
      .stub(vscode.window, 'showOpenDialog')
      .resolves([vscode.Uri.file('/path/to/folder')])
    const folder = await vscode.window.showOpenDialog()
    assert.strictEqual(folder?.[0].fsPath, '/path/to/folder')
    stub.restore()
  })

  test('selectFolder returns undefined when no folder is selected', async () => {
    const stub = sinon.stub(vscode.window, 'showOpenDialog').resolves(undefined)
    const folder = await vscode.window.showOpenDialog()
    assert.strictEqual(folder, undefined)
    stub.restore()
  })
})
