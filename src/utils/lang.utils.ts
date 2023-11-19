/* eslint-disable @typescript-eslint/no-var-requires */

import * as fs from 'fs'
import * as path from 'path'
import ncp from 'ncp'

const sourceDir = path.join(__dirname, 'src')
const destDir = path.join(__dirname, 'out')

const loadLanguages = () => {
  fs.readdirSync(sourceDir).forEach((file) => {
    const sourceFile = path.join(sourceDir, file)
    const destFile = path.join(destDir, file)

    if (file.endsWith('.json')) {
      ncp(sourceFile, destFile, (err) => {
        if (err) {
          console.error(`Error copying ${file}:`, err)
        } else {
          console.log(`Copied ${file} to ${destDir}`)
        }
      })
    }
  })

  const localesDir = path.join(sourceDir, 'locales')
  const destLocalesDir = path.join(destDir, 'locales')

  ncp(localesDir, destLocalesDir, (err) => {
    if (err) {
      console.error(`Error copying locales folder:`, err)
    } else {
      console.log(`Copied locales folder to ${destDir}`)
    }
  })
}

loadLanguages()
