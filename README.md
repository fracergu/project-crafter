# ProjectCrafter

![ProjectCrafter Logo](images/ProjectCrafterLogo.png)

## Project Description

ProjectCrafter is an agile development Visual Studio Code extension designed to simplify and automate the creation of software projects in various technologies and frameworks. Through an intuitive interface and a guided process, it allows developers to configure and start new projects quickly and efficiently directly from the Visual Studio Code environment.

## Key Features

- **Interactive Technology Selection:** Enables users to choose from a variety of technologies such as Node.js, React, Angular, among others, through an interactive menu.

- **Dependency Management:** Automatically detects and notifies missing dependencies for the selected technology, providing links for installation.

## Installation

To get started with ProjectCrafter, follow these steps:

1. Clone this repository on your local machine:

   ```bash
   git clone https://github.com/fracergu/project-crafter.git
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```
3. Initialize **Husky** to run the linter, code formatting, and unit tests.
   ```bash
   npm run prepare
   ```
4. Start the development:

   In the project, press `F5` to build the extension, and press `Ctrl + Shift + P` and choose Project Crafter: Create Project to access the interactive menu.

## Contribution

Contributions are welcome! If you find any issues or have ideas to improve ProjectCrafter, please [create an issue](https://github.com/fracergu/project-crafter/issues) or submit a [pull request](https://github.com/fracergu/project-crafter/pulls).
