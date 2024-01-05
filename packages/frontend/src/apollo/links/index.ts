import { authLink } from './authorization'
import { errorLink } from './errorLink'
import { httpLink } from './httpLink'

// eslint-disable-next-line unicorn/prefer-spread
export const link = errorLink.concat(authLink.concat(httpLink))
