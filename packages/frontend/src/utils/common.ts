/**
 * Checks if two objects are equal by comparing their properties.
 * Note: Only checks first level, doesn't do deep comparison.
 *
 * @param object1 - The first object to compare.
 * @param object2 - The second object to compare.
 * @returns True if the objects are equal, false otherwise.
 */
export function areObjectsEqual<T extends Record<string, unknown>>(object1: T, object2: T): boolean {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  return keys1.length === keys2.length && keys1.every(key => object1[key] === object2[key])
}
