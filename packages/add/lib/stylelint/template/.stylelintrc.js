module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-css-modules',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
};
