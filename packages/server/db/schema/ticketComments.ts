import { relations } from 'drizzle-orm'
import { char, pgTable, timestamp, text } from 'drizzle-orm/pg-core'

import { tickets } from './tickets'
import { users } from './users'

export const ticketComments = pgTable('ticket_comments', {
  id: char('id', { length: 24 }).primaryKey(),
  comment: text('comment').notNull(),
  authorId: char('author_id', { length: 24 })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  ticketId: char('ticket_id', { length: 24 })
    .references(() => tickets.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull().unique(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const ticketCommentsRelations = relations(ticketComments, ({ one }) => ({
  author: one(users, {
    fields: [ticketComments.authorId],
    references: [users.id],
  }),
  ticket: one(tickets, {
    fields: [ticketComments.ticketId],
    references: [tickets.id],
  }),
}))

export type TicketCommentsTable = typeof ticketComments
export type TicketComment = typeof ticketComments.$inferSelect
