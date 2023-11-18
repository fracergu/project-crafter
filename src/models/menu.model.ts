export interface TechnologyDependency {
  name: string
  installationUrl: string
  checkCommand: string
}

export interface CommandWithDependency {
  command: string
  dependency?: TechnologyDependency
}

export type FrameworkOptionValue =
  | string
  | CommandWithDependency
  | FrameworkOptions

export interface FrameworkOptions {
  [key: string]: FrameworkOptionValue
}

export interface Technology {
  dependency: TechnologyDependency
  frameworks: { [key: string]: FrameworkOptions }
}

export interface Technologies {
  [key: string]: Technology
}

export interface Menu {
  technologies: Technologies
}
