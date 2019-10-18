module.exports = {
  // 必须的，不然一些样式规则还解析不出来
  parser: '@typescript-eslint/parser',
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
      'Promise',
    ],
  },
};
