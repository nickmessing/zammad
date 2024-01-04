import { relations } from 'drizzle-orm'
import { char, pgTable, uniqueIndex, varchar, timestamp } from 'drizzle-orm/pg-core'

import { tickets } from './tickets'

export const users = pgTable(
  'users',
  {
    id: char('id', { length: 24 }).primaryKey(),
    username: varchar('username', { length: 32 }).notNull(),
    displayName: varchar('display_name', { length: 64 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull().unique(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  users => {
    return {
      usernameIndex: uniqueIndex('username_idx').on(users.username),
    }
  },
)

export const usersRelations = relations(users, ({ many }) => ({
  createdTickets: many(tickets, {
    relationName: 'author',
  }),
  assignedTickets: many(tickets, {
    relationName: 'assignee',
  }),
}))

export type UsersTable = typeof users
export type User = typeof users.$inferSelect
