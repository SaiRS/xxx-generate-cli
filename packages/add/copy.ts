import shelljs from 'shelljs';

// copy一些资源到dist中去
shelljs.cd(__dirname);

// commit-lint
shelljs.cp('./lib/commit-lint/.commitlintrc.js', './dist/lib/commit-lint');
shelljs.cp('./lib/commit-lint/.huskyrc.js', './dist/lib/commit-lint');

// editor-config
shelljs.cp('./lib/editor-config/.editorconfig', './dist/lib/editor-config');

// typescript
shelljs.cp('./lib/typescript/tsconfig.json', './dist/lib/typescript');
shelljs.cp('./lib/typescript/babel.config.js', './dist/lib/typescript');

// eslint
shelljs.cp('./lib/eslint/.eslintrc.js', './dist/lib/eslint');
shelljs.cp('./lib/eslint/.eslintignore', './dist/lib/eslint');

// prettier
shelljs.cp('./lib/prettier/.prettierignore', './dist/lib/prettier');
shelljs.cp('./lib/prettier/.prettierrc.js', './dist/lib/prettier');

shelljs.cd('-');