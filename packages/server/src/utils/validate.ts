import { GraphQLError } from 'graphql'
import { z, ZodError } from 'zod'

import { tickets } from '../../db/schema/tickets'
import { ticketStatuses } from '../../db/schema/ticketStatuses'
import { users } from '../../db/schema/users'

import { extractLength } from './tableInfo'

import type { ZodSchema, ZodString } from 'zod'

export const errorMessages = {
  invalidId:
    "Oops! This ID looks like it's from another planet. Could you double-check that? We need something a bit more down-to-earth!",
  invalidUsername:
    "Uh-oh, your username's gone wild with special characters! Let's tame it down - only use letters, numbers, underscores, and dashes. It's not a treasure map, after all!",
  tooShort: (fieldName: string, minLength: number) =>
    `Whoa, that's a bit too concise! ${fieldName} needs to be at least ${minLength} characters. Let's give it another try, maybe something longer than a sneeze?`,
  tooLong: (fieldName: string, maxLength: number) =>
    `Ambitious, aren't we? But let's keep it under ${maxLength} characters. ${fieldName} shouldn't be longer than a dinosaur's name!`,
  colors: {
    hueMin:
      "Trying to set the hue below 0? That's like a color limbo! Let's keep it above ground level, starting from 0, please.",
    hueMax:
      "Whoa, aiming above 360 for hue? You're really reaching for the stars! But let's bring it back to earth and keep it at 360 or below.",
    saturationMin:
      "Saturation can't go into negative numbers - this isn't a color debt! Let's start at 0 and add some color to life.",
    saturationMax:
      "A saturation level over 100? That's a color party that's too wild! Dial it back a bit and keep it at a chill 100 max.",
  },
  orderMin:
    "Oops, this order number's gone below zero! Let's keep things in order and stick to positive numbers, shall we? Negative sorting is a bit too unconventional for us!",
  notFound: (entityName: string) =>
    `Whoops! We looked everywhere but couldn't find any ${entityName}. Are you sure it exists, or did it go on a secret mission? Let's try searching again!`,
  first: {
    min: "Looks like your items count went into negative numbers. That's some quantum physics stuff right there! Let's stick to positive numbers, shall we?",
    max: "Whoa, trying to paginate over 100 items? That's a lot to handle at once! Let's keep it more manageable and stick to 100 or fewer, please.",
  },
  datetime:
    "Oops! This looks more like a secret code than a date. Can we try a real datetime? Our time machine can't decode this one!",
  forbidden:
    "Oops! Looks like you've tried to enter a top-secret area. Sorry, but it's off-limits for now. Maybe try something else or check your access permissions?",
}

function limitLength<TableSchema, Key extends keyof TableSchema>(
  fieldName: string,
  tableSchema: TableSchema,
  key: Key,
  minLength = 3,
  schema: ZodString = z.string(),
) {
  const maxLength = extractLength(tableSchema, key)
  return schema
    .min(minLength, errorMessages.tooShort(fieldName, minLength))
    .max(maxLength, errorMessages.tooLong(fieldName, maxLength))
}

export const zodSchemas = {
  id: z.string().regex(/^[\da-z]{24}$/, errorMessages.invalidId),
  username: limitLength('Username', users, 'username', 3, z.string().regex(/^[\w-]+$/, errorMessages.invalidUsername)),
  displayName: limitLength('Display name', users, 'displayName'),
  ticket: {
    title: limitLength('Ticket title', tickets, 'title'),
    description: limitLength('Ticket description', tickets, 'description'),
  },
  ticketStatus: {
    name: limitLength('Ticket status name', ticketStatuses, 'name'),
    description: limitLength('Ticket status description', ticketStatuses, 'description', 0),
  },
  colorBase: z.object({
    hue: z.number().int().nonnegative(errorMessages.colors.hueMin).max(360, errorMessages.colors.hueMax),
    saturation: z
      .number()
      .int()
      .nonnegative(errorMessages.colors.saturationMin)
      .max(100, errorMessages.colors.saturationMax),
  }),
  order: z.number().int().nonnegative(errorMessages.orderMin),
  first: z.number().int().nonnegative(errorMessages.first.min).max(100, errorMessages.first.max),
  datetime: z.string().datetime(errorMessages.datetime),
}

export async function validateUsingSchema<Output = unknown>(schema: ZodSchema<Output>, input: Output) {
  try {
    return await schema.parseAsync(input)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new GraphQLError(error.issues.map(issue => issue.message).join('\n'), {
        extensions: { code: 'INVALID_INPUT' },
      })
    }

    throw error
  }
}
