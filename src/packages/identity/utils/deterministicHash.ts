import { blake2AsHex } from '@polkadot/util-crypto'

function buildDeterministicString(value: any): string {
  if (value === null || value === undefined) return ''

  if (typeof value === 'string') return value
  if (typeof value === 'boolean') return value ? 'true' : 'false'

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return ''
    if (Object.is(value, -0)) return ''
    return String(value)
  }

  if (Array.isArray(value)) {
    return `[${value.map(buildDeterministicString).join(',')}]`
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value).sort()
    const pairs: Array<string> = keys.map(
      (k: string) => `"${k}":${buildDeterministicString(value[k])}`,
    )
    return `{${pairs.join(',')}}`
  }

  return ''
}

export function deterministicObjectBlake2Hash(data: any): string {
  const s = buildDeterministicString(data)
  return blake2AsHex(new TextEncoder().encode(s))
}
