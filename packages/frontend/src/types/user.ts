import type { User } from '@/generated/graphql'

export type UserProfileInformation = Pick<User, 'username' | 'displayName'>
