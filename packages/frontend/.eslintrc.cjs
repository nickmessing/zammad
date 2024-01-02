/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['@zammad-coding-test/standards'],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.app.json', './tsconfig.node.json', './tsconfig.vitest.json', './e2e/tsconfig.json'],
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'import/no-unresolved': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.app.json', './tsconfig.node.json', './tsconfig.vitest.json'],
      },
    },
  },
}
