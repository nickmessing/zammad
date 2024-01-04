import type { Config } from 'drizzle-kit'

// eslint-disable-next-line import/no-default-export
export default {
  schema: './db/schema/*.ts',
  out: './drizzle',
} satisfies Config
