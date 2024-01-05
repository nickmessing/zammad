import type { ColorBase } from '@/generated/graphql'

// Need it to compute color base for users avatars
export function fletchersChecksum(data: Uint8Array | string): number {
  const dataAsUint8Array = typeof data === 'string' ? new TextEncoder().encode(data) : data

  let sum1 = 0
  let sum2 = 0

  for (const datum of dataAsUint8Array) {
    sum1 = (sum1 + datum) % 255
    sum2 = (sum2 + sum1) % 255
  }

  return (sum2 << 8) | sum1
}

export function getColorBaseFromNumber(number: number): ColorBase {
  const binary = number.toString(2)
  const binary16 = binary.padStart(16, '0')
  const first9 = binary16.slice(0, 9)
  const last7 = binary16.slice(9, 16)

  const first9Number = Number.parseInt(first9, 2)
  const last7Number = Number.parseInt(last7, 2)

  const hue = Math.round((first9Number * 360) / 512)
  const saturation = Math.round((last7Number * 100) / 128)

  return { hue, saturation }
}

export function getColorBaseFromString(string: string): ColorBase {
  console.log({ string })
  const checksum = fletchersChecksum(string)
  console.log({ checksum })
  return getColorBaseFromNumber(checksum)
}
