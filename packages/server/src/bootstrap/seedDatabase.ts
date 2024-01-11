/* eslint-disable no-empty */
import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'

import { ticketComments } from '../../db/schema/ticketComments'
import { tickets } from '../../db/schema/tickets'
import { ticketStatuses } from '../../db/schema/ticketStatuses'
import { users } from '../../db/schema/users'
import { zodSchemas } from '../utils/validate'

import type { Database } from './database'

const TICKET_STATUSES = ['New', 'In Progress', 'Blocked', 'In Review', 'Completed'] as const

const NUMBER_OF_USERS = [20, 50] as const
const NUMBER_OF_TICKETS = [400, 600] as const
const NUMBER_OF_COMMENTS_PER_TICKET = [100, 200] as const

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

  let username = faker.internet.userName({ firstName, lastName })
  let isUsernameValid = zodSchemas.username.safeParse(username).success
  while (!isUsernameValid) {
    username = faker.internet.userName({ firstName })
    isUsernameValid = zodSchemas.username.safeParse(username).success
  }

  const displayName = faker.person.fullName({ firstName, lastName })
  const createdAt = faker.date.past({ years: 1 })
  const updatedAt = isUpdated()
    ? faker.date.between({
        from: createdAt,
        to: now,
      })
    : createdAt

  return { id, username, displayName, createdAt, updatedAt }
}
function createRandomTicketStatus(name: string, order: number) {
  const staticColors = {
    Blocked: { hue: 0, saturation: 84 },
    Completed: { hue: 142, saturation: 71 },
  }

  const id = createId()
  const description = faker.lorem.sentence()
  const colorHue =
    name in staticColors ? staticColors[name as keyof typeof staticColors].hue : faker.number.int({ min: 0, max: 360 })
  const colorSaturation =
    name in staticColors
      ? staticColors[name as keyof typeof staticColors].saturation
      : faker.number.int({ min: 10, max: 90 })
  const createdAt = faker.date.past({ years: 1 })
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

  // Inserting all the data at once fails, doing in serial since seeding is only happening once
  // Expect this to take forever
  for (const user of usersToInsert) {
    console.log('Inserting user', user)
    try {
      await database.insert(users).values([user])
    } catch {}
  }
  for (const ticketStatus of ticketStatusesToInsert) {
    console.log('Inserting ticket status', ticketStatus)
    try {
      await database.insert(ticketStatuses).values([ticketStatus])
    } catch {}
  }
  for (const ticket of ticketsToInsert) {
    console.log('Inserting ticket', ticket)
    try {
      await database.insert(tickets).values([ticket])
    } catch {}
  }
  for (const ticketComment of ticketCommentsToInsert) {
    console.log('Inserting ticket comment', ticketComment)
    try {
      await database.insert(ticketComments).values([ticketComment])
    } catch {}
  }
}
