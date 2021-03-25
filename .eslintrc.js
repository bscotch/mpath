module.exports = {
  env: {
    es2020: true,
    node: true,
    mocha: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: 'test/src/**/*.ts',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': 'off',
    'key-spacing': 'off',
    quotes: 'off',
    eqeqeq: 'off',
    camelcase: 'off',
    'require-await': 'error',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'getter-return': 'off',
    'no-constant-condition': 'off',
    'no-prototype-builtins': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
  },
};
