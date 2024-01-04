import { authLink } from './authorization'
import { httpLink } from './httpLink'

// eslint-disable-next-line unicorn/prefer-spread
export const link = authLink.concat(httpLink)
