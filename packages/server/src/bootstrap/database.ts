import { count } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { ticketComments, ticketCommentsRelations } from '../../db/schema/ticketComments'
import { tickets, ticketsRelations } from '../../db/schema/tickets'
import { ticketStatuses, ticketStatusesRelations } from '../../db/schema/ticketStatuses'
import { users, usersRelations } from '../../db/schema/users'

import { seedDatabase } from './seedDatabase'

export async function createDatabaseConnection() {
  const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
  const queryClient = postgres(connectionString)
  const schema = {
    ticketComments,
    tickets,
    ticketStatuses,
    users,
    ticketCommentsRelations,
    ticketsRelations,
    ticketStatusesRelations,
    usersRelations,
  }
  const database = drizzle(queryClient, { schema, logger: true })

  await migrate(database, { migrationsFolder: 'drizzle' })

  const [{ usersCount }] = await database.select({ usersCount: count() }).from(users)
  const [{ ticketsCount }] = await database.select({ ticketsCount: count() }).from(tickets)
  const [{ ticketStatusesCount }] = await database.select({ ticketStatusesCount: count() }).from(ticketStatuses)
  const [{ ticketCommentsCount }] = await database.select({ ticketCommentsCount: count() }).from(ticketComments)

  if (usersCount === 0 && ticketsCount === 0 && ticketStatusesCount === 0 && ticketCommentsCount === 0) {
    await seedDatabase(database)
  }

  return { database, schema }
}

type Return = Awaited<ReturnType<typeof createDatabaseConnection>>

export type Schema = Return['schema']
export type Database = Return['database']
