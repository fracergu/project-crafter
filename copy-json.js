"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
const sourceDir = path.join(__dirname, 'src');
const destDir = path.join(__dirname, 'out');
const copyJsonFiles = () => {
    // Copia archivos .json de src a out
    fs.readdirSync(sourceDir).forEach((file) => {
        const sourceFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);
        if (file.endsWith('.json')) {
            ncp(sourceFile, destFile, (err) => {
                if (err) {
                    console.error(`Error copying ${file}:`, err);
                }
                else {
                    console.log(`Copied ${file} to ${destDir}`);
                }
            });
        }
    });
    // Copia la carpeta locales de src a out
    const localesDir = path.join(sourceDir, 'locales');
    const destLocalesDir = path.join(destDir, 'locales');
    ncp(localesDir, destLocalesDir, (err) => {
        if (err) {
            console.error(`Error copying locales folder:`, err);
        }
        else {
            console.log(`Copied locales folder to ${destDir}`);
        }
    });
};
copyJsonFiles();
//# sourceMappingURL=copy-json.js.map