import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'

import { ticketComments } from '../../db/schema/ticketComments'
import { tickets } from '../../db/schema/tickets'
import { ticketStatuses } from '../../db/schema/ticketStatuses'
import { users } from '../../db/schema/users'

import type { Database } from './database'

const TICKET_STATUSES = ['New', 'In Progress', 'Blocked', 'In Review', 'Completed'] as const

const NUMBER_OF_USERS = [5, 20] as const
const NUMBER_OF_TICKETS = [10, 50] as const
const NUMBER_OF_COMMENTS_PER_TICKET = [0, 10] as const

const now = new Date()

type User = ReturnType<typeof createRandomUser>
type TicketStatus = ReturnType<typeof createRandomTicketStatus>
type Ticket = ReturnType<typeof createRandomTicket>

function isUpdated() {
  return Math.random() > 0.8
}

function createRandomUser() {
  const id = createId()
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const username = faker.internet.userName({ firstName, lastName })
  const displayName = faker.person.fullName({ firstName, lastName })
  const createdAt = faker.date.recent({ days: 20 })
  const updatedAt = isUpdated()
    ? faker.date.between({
        from: createdAt,
        to: now,
      })
    : createdAt

  return { id, username, displayName, createdAt, updatedAt }
}
function createRandomTicketStatus(name: string, order: number) {
  const id = createId()
  const description = faker.lorem.sentence()
  const colorHue = faker.number.int({ min: 0, max: 360 })
  const colorSaturation = faker.number.int({ min: 10, max: 90 })
  const createdAt = faker.date.recent({ days: 20 })
  const updatedAt = isUpdated()
    ? faker.date.between({
        from: createdAt,
        to: now,
      })
    : createdAt

  return { id, name, description, colorHue, colorSaturation, order, createdAt, updatedAt }
}
function createRandomTicket(statuses: TicketStatus[], users: User[]) {
  const author = faker.helpers.arrayElement(users)

  const id = createId()
  const title = faker.lorem.sentence({ min: 2, max: 5 })
  const description = faker.lorem.paragraph()
  const statusId = faker.helpers.arrayElement(statuses).id
  const authorId = author.id
  const assigneeId = Math.random() > 0.2 ? faker.helpers.arrayElement(users).id : undefined
  const createdAt = faker.date.between({
    from: author.createdAt,
    to: now,
  })
  const updatedAt = isUpdated()
    ? faker.date.between({
        from: createdAt,
        to: now,
      })
    : createdAt

  return { id, title, description, statusId, authorId, assigneeId, createdAt, updatedAt }
}

function createRandomTicketComment(ticket: Ticket, users: User[]) {
  const author = faker.helpers.arrayElement(users)
  const laterDate = new Date(Math.max(ticket.createdAt.getTime(), author.createdAt.getTime()))

  const id = createId()
  const ticketId = ticket.id
  const authorId = author.id
  const comment = faker.lorem.paragraph()
  const createdAt = faker.date.between({
    from: laterDate,
    to: now,
  })
  const updatedAt = isUpdated()
    ? faker.date.between({
        from: createdAt,
        to: now,
      })
    : createdAt

  return { id, ticketId, authorId, comment, createdAt, updatedAt }
}

export async function seedDatabase(database: Database) {
  const numberOfUsers = faker.number.int({ min: NUMBER_OF_USERS[0], max: NUMBER_OF_USERS[1] })
  const numberOfTickets = faker.number.int({ min: NUMBER_OF_TICKETS[0], max: NUMBER_OF_TICKETS[1] })

  const usersToInsert = Array.from({ length: numberOfUsers }).map(() => createRandomUser())
  const ticketStatusesToInsert = TICKET_STATUSES.map((name, index) => createRandomTicketStatus(name, index))
  const ticketsToInsert = Array.from({ length: numberOfTickets }).map(() =>
    createRandomTicket(ticketStatusesToInsert, usersToInsert),
  )
  const ticketCommentsToInsert = ticketsToInsert.flatMap(ticket => {
    const numberOfComments = faker.number.int({
      min: NUMBER_OF_COMMENTS_PER_TICKET[0],
      max: NUMBER_OF_COMMENTS_PER_TICKET[1],
    })
    return Array.from({ length: numberOfComments }).map(() => createRandomTicketComment(ticket, usersToInsert))
  })

  await database.insert(users).values(usersToInsert)
  await database.insert(ticketStatuses).values(ticketStatusesToInsert)
  await database.insert(tickets).values(ticketsToInsert)
  await database.insert(ticketComments).values(ticketCommentsToInsert)
}
