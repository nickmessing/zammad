import { config } from 'dotenv'

export function loadEnvironment() {
  if (process.env.NODE_ENV === 'development') {
    config({ path: '.env.development' })
  }
}
