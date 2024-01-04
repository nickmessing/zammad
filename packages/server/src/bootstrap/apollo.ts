import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { DateTimeResolver } from 'graphql-scalars'

import * as resolvers from '../resolvers'
import { createToken, verifyToken } from '../utils/jwt'

import type { Database, Schema } from './database'
import type { ApolloContext } from '../types/apollo'
import type { TokenInfo } from '../utils/jwt'

const graphqlFolder = resolve(fileURLToPath(import.meta.url), '../../graphql')

export async function createApollo({ database, schema }: { database: Database; schema: Schema }) {
  const files = await readdir(graphqlFolder)
  const typeDefs = await Promise.all(files.map(file => readFile(resolve(graphqlFolder, file), 'utf8')))

  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers: {
      DateTime: DateTimeResolver,
      ...resolvers,
    },
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) },
    async context({ req, res }) {
      const authorizationHeader = req.headers.authorization

      const tokenInfo: TokenInfo = authorizationHeader?.startsWith('Bearer ')
        ? await verifyToken(authorizationHeader.replace(/^Bearer /, ''))
        : undefined

      // Renew token if expires in 1 hour
      if (tokenInfo?.exp && tokenInfo.exp - Date.now() / 1000 < 60 * 60) {
        const user = await database.query.users.findFirst({
          where: (users, { eq }) => eq(users.id, tokenInfo.sub),
        })

        if (user) {
          res.setHeader('X-Renew-Token', await createToken(user))
        }
      }

      return { database, schema, tokenInfo }
    },
  })

  console.log(`🚀  Server ready at: ${url}`)
}
