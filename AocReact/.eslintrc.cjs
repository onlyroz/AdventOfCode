module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  ignorePatterns: [
    '.eslintrc.cjs', 
    'vite.config.ts', 
    'node_modules/*', 
    'dist/*',
    'tailwind.config.cjs',
    'postcss.config.cjs',
    '__mocks__/*',
    'analytics.js'

  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    'react-refresh',
    '@typescript-eslint/eslint-plugin'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '__',
        argsIgnorePattern: '__',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        tabWidth: 2,
        endOfLine: 'auto',
        avoidEscape: true,
        trailingComma: 'all',
        jsxBracketSameLine: true,
      },
    ],
  },
}
