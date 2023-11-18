export interface PackageManager {
  command: string
  downloadUrl: string
}

export interface FrameworkOptions {
  [key: string]: string | FrameworkOptions
}

export interface Technology {
  packageManager: PackageManager
  frameworks: { [key: string]: FrameworkOptions }
}

export interface Menu {
  technologies: { [key: string]: Technology }
}
