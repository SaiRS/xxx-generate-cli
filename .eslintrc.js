module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:xxx-eslint/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.js', '.ts', 'jsx', 'tsx', '.json'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
      },
    ],
    'node/no-missing-import': [
      'error',
      {
        tryExtensions: ['.js', '.json', '.node', '.ts', '.tsx', '.jsx'],
      },
    ],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],
    'valid-jsdoc': 'error',
  },
  settings: {
    polyfills: [
      // Example of marking entire API and all methods and properties as polyfilled
      'Promise',
    ],
  },
};
