import { relations } from 'drizzle-orm'
import { char, pgTable, varchar, timestamp, integer } from 'drizzle-orm/pg-core'

import { tickets } from './tickets'

export const ticketStatuses = pgTable('ticket_statuses', {
  id: char('id', { length: 24 }).primaryKey(),
  name: varchar('name', { length: 64 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  colorHue: integer('colorHue').notNull(),
  colorSaturation: integer('colorSaturation').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull().unique(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const ticketStatusesRelations = relations(ticketStatuses, ({ many }) => ({
  tickets: many(tickets),
}))

export type TicketStatusesTable = typeof ticketStatuses
export type TicketStatus = typeof ticketStatuses.$inferSelect
