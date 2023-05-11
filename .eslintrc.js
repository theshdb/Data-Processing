module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'ts.config.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    semi: 0,
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '.eslintrc.js'
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
  root: true
}