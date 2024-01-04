import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    'src/generated/graphql.ts': {
      schema: '../server/src/graphql/*.graphql',
      documents: ['./src/graphql/**/*.graphql'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-vue-apollo',
        {
          add: {
            content: [
              '/* eslint-disable unicorn/prevent-abbreviations */',
              '/* eslint-disable import/no-named-as-default */',
            ].join('\n'),
          },
        },
      ],
      config: {
        scalars: {
          DateTime: 'string',
        },
        vueCompositionApiImportFrom: 'vue',
        withCompositionFunctions: true,
      },
    },
  },
}
// eslint-disable-next-line import/no-default-export
export default config
