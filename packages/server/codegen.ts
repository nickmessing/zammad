import type { CodegenConfig } from '@graphql-codegen/cli'

type ImportedTypeMapDescriptor = {
  graphqlTypeName: string
  tsTypeName: string
  fileName: string
}

const importedTypesDescriptors: ImportedTypeMapDescriptor[] = [
  {
    graphqlTypeName: 'User',
    tsTypeName: 'User',
    fileName: '../../db/schema/users',
  },
  {
    graphqlTypeName: 'AuthenticationResponse',
    tsTypeName: 'User',
    fileName: '../../db/schema/users',
  },
  {
    graphqlTypeName: 'TicketStatus',
    tsTypeName: 'TicketStatus',
    fileName: '../../db/schema/ticketStatuses',
  },
  {
    graphqlTypeName: 'TicketStatusMutation',
    tsTypeName: 'TicketStatus',
    fileName: '../../db/schema/ticketStatuses',
  },
  {
    graphqlTypeName: 'Ticket',
    tsTypeName: 'Ticket',
    fileName: '../../db/schema/tickets',
  },
  {
    graphqlTypeName: 'TicketMutation',
    tsTypeName: 'Ticket',
    fileName: '../../db/schema/tickets',
  },
  {
    graphqlTypeName: 'TicketComment',
    tsTypeName: 'TicketComment',
    fileName: '../../db/schema/ticketComments',
  },
  {
    graphqlTypeName: 'TicketCommentMutation',
    tsTypeName: 'TicketComment',
    fileName: '../../db/schema/ticketComments',
  },
]

const importMappedTypes: Record<string, Set<string>> = {}
const imports: string[] = []

for (const { tsTypeName, fileName } of importedTypesDescriptors) {
  importMappedTypes[fileName] = importMappedTypes[fileName] ?? new Set()
  importMappedTypes[fileName].add(tsTypeName)
}

for (const fileName in importMappedTypes) {
  imports.push(
    `import type { ${[...importMappedTypes[fileName]]
      .map(typeName => `${typeName} as Mapped${typeName}`)
      .join(', ')} } from '${fileName}'`,
  )
}

const mappers = Object.fromEntries(
  importedTypesDescriptors.map(({ graphqlTypeName, tsTypeName }) => [graphqlTypeName, `Mapped${tsTypeName}`]),
)

const config: CodegenConfig = {
  generates: {
    'src/generated/graphql.ts': {
      schema: './src/graphql/*.graphql',
      plugins: [
        'typescript',
        'typescript-resolvers',
        {
          add: {
            content: [
              '/* eslint-disable @typescript-eslint/ban-types */',
              '/* eslint-disable @typescript-eslint/no-explicit-any */',
              '/* eslint-disable unicorn/prevent-abbreviations */',
              ...imports,
            ].join('\n'),
          },
        },
      ],
      config: {
        scalars: {
          DateTime: 'string',
        },
        contextType: '../types/apollo#ApolloContext',
        mappers: {
          ...mappers,
        },
        maybeValue: 'T | undefined',
      },
    },
  },
}
// eslint-disable-next-line import/no-default-export
export default config
