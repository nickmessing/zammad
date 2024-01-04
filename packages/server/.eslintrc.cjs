/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['@zammad-coding-test/standards'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.vitest.json'],
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
}
