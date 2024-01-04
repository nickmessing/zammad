export function extractLength<TableSchema, Key extends keyof TableSchema>(tableSchema: TableSchema, key: Key) {
  const columnSchema = tableSchema[key]
  if (typeof columnSchema === 'object' && columnSchema != undefined && 'length' in columnSchema) {
    return Number(columnSchema.length)
  }

  return 0
}
