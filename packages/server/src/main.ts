import { createApollo } from './bootstrap/apollo'
import { createDatabaseConnection } from './bootstrap/database'
import { loadEnvironment } from './bootstrap/environment'

loadEnvironment()
const { database, schema } = await createDatabaseConnection()
await createApollo({ database, schema })
