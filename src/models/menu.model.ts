export interface FrameworkOptions {
  [key: string]: string | FrameworkOptions
}

export interface TechnologyDependency {
  name: string
  installationUrl: string
  checkCommand: string
}

export interface Technology {
  dependency: TechnologyDependency
  installUrl: string
  frameworks: { [key: string]: FrameworkOptions }
}

export interface Menu {
  technologies: { [key: string]: Technology }
}
