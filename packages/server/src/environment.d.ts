declare namespace NodeJS {
  export interface ProcessEnvironment {
    NODE_ENV: 'development' | 'test' | 'production'
    PORT: string
    DATABASE_URL?: string
    DATABASE_HOST?: string
    DATABASE_PORT?: string
    DATABASE_NAME?: string
    DATABASE_USER?: string
    DATABASE_PASSWORD?: string
    JWT_KEY: string
  }
}
