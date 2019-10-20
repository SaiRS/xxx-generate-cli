import shelljs from 'shelljs';

// copy一些资源到dist中去
shelljs.cd(__dirname);

// commit-lint
shelljs.cp('./lib/commit-lint/.commitlintrc.js', './dist/commit-lint');
shelljs.cp('./lib/commit-lint/.huskyrc.js', './dist/commit-lint');
shelljs.cp('./lib/commit-lint/.versionrc.js', './dist/commit-lint');

// editor-config
shelljs.cp('./lib/editor-config/.editorconfig', './dist/editor-config');

// typescript
shelljs.cp('./lib/typescript/tsconfig.json', './dist/typescript');
shelljs.cp('./lib/typescript/babel.config.js', './dist/typescript');

// eslint
shelljs.cp('./lib/eslint/template/.eslintrc.js', './dist/eslint');
shelljs.cp('./lib/eslint/template/.eslintignore', './dist/eslint');

// prettier
shelljs.cp('./lib/prettier/.prettierignore', './dist/prettier');
shelljs.cp('./lib/prettier/.prettierrc.js', './dist/prettier');

// lint-staged
shelljs.cp('./lib/lint-staged/lint-staged.config.js', './dist/lint-staged');

// stylelint
shelljs.cp(
  './lib/stylelint/template/.stylelintignore',
  './dist/stylelint/template',
);
shelljs.cp(
  './lib/stylelint/template/.stylelintrc.js',
  './dist/stylelint/template',
);

// jest
shelljs.cp('./lib/jest/jest.config.js', './dist/jest/');

// webpack
shelljs.cp('./lib/webpack/webpack.config.js', './dist/webpack');
shelljs.cp('-ru', './lib/webpack/configs', './dist/webpack/');
shelljs.cp('-ru', './lib/webpack/public', './dist/webpack/');
shelljs.cp('-ru', './lib/webpack/scripts', './dist/webpack/');

shelljs.cd('-');
