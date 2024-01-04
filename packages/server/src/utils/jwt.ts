import { SignJWT, jwtVerify } from 'jose'

import type { User } from '../../db/schema/users'

const JWT_ISSUER = 'zammad:test:server'
const JWT_AUDIENCE = 'zammad:test:frontend'
const JWT_ALGORITHM = 'HS256'

export type Payload = {
  /**
   * Subject
   *
   * ```
   * user.id
   * ```
   *
   * {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.2 RFC 7519, Section 4.1.2}
   */
  sub: string
  /**
   * Nickname
   *
   * ```
   * user.displayName
   * ```
   *
   * {@link https://openid.net/specs/openid-connect-core-1_0.html#rfc.section.5.1 OpenID Connect Core 1.0, Section 5.1}
   */
  nickname: string
  /**
   * Preferred Username
   *
   * ```
   * user.username
   * ```
   *
   * {@link https://openid.net/specs/openid-connect-core-1_0.html#rfc.section.5.1 OpenID Connect Core 1.0, Section 5.1}
   */
  preferred_username: string
}

export async function createToken(user: User): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_KEY)

  // setting sub using .setSubject() below
  const payload: Omit<Payload, 'sub'> = {
    nickname: user.displayName,
    preferred_username: user.username,
  }

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setSubject(user.id)
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime('2h')
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_KEY)

    const { payload } = await jwtVerify<Payload>(token, secret, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: [JWT_ALGORITHM],
      requiredClaims: ['sub', 'nickname', 'preferred_username'],
    })

    return payload
  } catch {
    return
  }
}

export type TokenInfo = Awaited<ReturnType<typeof verifyToken>>
