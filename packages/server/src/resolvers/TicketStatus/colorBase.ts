import type { TicketStatusResolvers } from '../../generated/graphql'

export const colorBase = (parent => {
  return {
    hue: parent.colorHue,
    saturation: parent.colorSaturation,
  }
}) satisfies TicketStatusResolvers['colorBase']
