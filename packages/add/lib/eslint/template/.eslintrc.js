module.exports = {
  extends: ['plugin:xxx-eslint/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      ...require('eslint-plugin-xxx-eslint').configs.typescript,
    },
  ],
  settings: {
    polyfills: [
      // 解决Object is not iterable的error
      // 'Promise',
    ],
  },
};
