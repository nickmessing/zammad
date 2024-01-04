import { relations } from 'drizzle-orm'
import { char, pgTable, varchar, timestamp, text } from 'drizzle-orm/pg-core'

import { ticketStatuses } from './ticketStatuses'
import { users } from './users'

// type Ticket {
//   author: User!
//   assignee: User
// }

export const tickets = pgTable('tickets', {
  id: char('id', { length: 24 }).primaryKey(),
  title: varchar('title', { length: 64 }).notNull(),
  description: text('description').notNull(),
  statusId: char('status_id', { length: 24 })
    .references(() => ticketStatuses.id, { onDelete: 'cascade' })
    .notNull(),
  authorId: char('author_id', { length: 24 })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  assigneeId: char('assignee_id', { length: 24 }).references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull().unique(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const ticketsRelations = relations(tickets, ({ one }) => ({
  status: one(ticketStatuses, {
    fields: [tickets.statusId],
    references: [ticketStatuses.id],
  }),
  author: one(users, {
    fields: [tickets.authorId],
    references: [users.id],
  }),
  assignee: one(users, {
    fields: [tickets.assigneeId],
    references: [users.id],
  }),
}))

export type TicketsTable = typeof tickets
export type Ticket = typeof tickets.$inferSelect
