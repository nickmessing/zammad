import type { Database, Schema } from '../bootstrap/database'
import type { TokenInfo } from '../utils/jwt'

export type ApolloContext = {
  database: Database
  schema: Schema
  tokenInfo: TokenInfo
}
