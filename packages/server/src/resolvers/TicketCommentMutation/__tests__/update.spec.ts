/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { eq } from 'drizzle-orm'
import { describe, it, expect, vi } from 'vitest'

import { ticketComments, ticketCommentsRelations } from '../../../../db/schema/ticketComments'
import { tickets, ticketsRelations } from '../../../../db/schema/tickets'
import { ticketStatuses, ticketStatusesRelations } from '../../../../db/schema/ticketStatuses'
import { users, usersRelations } from '../../../../db/schema/users'
import { update } from '../update'

import type { TicketComment } from '../../../../db/schema/ticketComments'
import type {
  RequireFields,
  TicketCommentMutationUpdateArgs as TicketCommentMutationUpdateArguments,
} from '../../../generated/graphql'
import type { ApolloContext } from '../../../types/apollo'
import type { Mock } from 'vitest'

function createMockArguments() {
  const parent: TicketComment = {
    id: 'ticket_id',
    comment: 'comment',
    authorId: 'author_id',
    ticketId: 'ticket_id',
    createdAt: new Date('2021-01-01'),
    updatedAt: new Date('2021-02-03'),
  }
  const input: RequireFields<TicketCommentMutationUpdateArguments, 'comment'> = {
    comment: 'new comment',
  }

  const drizzleRequestContext: {
    set: Mock
    where: Mock
    returning: Mock
  } = {
    set: vi.fn(() => drizzleRequestContext),
    where: vi.fn(() => drizzleRequestContext),
    returning: vi.fn(() => [parent]),
  }

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

  const context = {
    database: {
      update: vi.fn(() => drizzleRequestContext),
    },
    schema,
    tokenInfo: {
      sub: 'author_id',
    },
  } as unknown as ApolloContext

  return { parent, input, context, drizzleRequestContext }
}

describe('TicketCommentMutation.update', () => {
  it('happy path', async () => {
    const { parent, input, context, drizzleRequestContext } = createMockArguments()
    await expect(update(parent, input, context)).resolves.toEqual(parent)
    expect(drizzleRequestContext.set).toHaveBeenCalledWith({
      comment: input.comment,
      updatedAt: expect.any(Date),
    })
    expect(drizzleRequestContext.where).toHaveBeenCalledWith(eq(ticketComments.id, parent.id))
  })
  it('forbidden for non-authenticated', async () => {
    const { parent, input, context } = createMockArguments()
    await expect(
      update(parent, input, {
        ...context,
        tokenInfo: undefined,
      }),
    ).rejects.toThrowError(
      "Oops! Looks like you're trying to sneak into the VIP section. Please log in first so we can roll out the red carpet for you!",
    )
  })
  it('forbidden for non-owned', async () => {
    const { parent, input, context } = createMockArguments()
    await expect(
      update(
        {
          ...parent,
          authorId: 'some_other_id',
        },
        input,
        context,
      ),
    ).rejects.toThrowError(
      "Oops! Looks like you've tried to enter a top-secret area. Sorry, but it's off-limits for now. Maybe try something else or check your access permissions?",
    )
  })
})
