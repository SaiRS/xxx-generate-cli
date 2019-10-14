import { extendJSON, extendPackageJSON, copyTo } from '../lib/utils';
import fs from 'fs';
import path from 'path';

describe('@xxx-generate-cli/utils,extendJson', () => {
  test('extendJson', () => {
    const source = {
      a: [{ b: 2 }, { d: 4 }],
    };
    const extend = {
      a: [{ c: 3 }, { f: 5 }],
    };
    const result = extendJSON(source, extend);

    expect(result).toEqual({ a: [{ b: 2, c: 3 }, { d: 4, f: 5 }] });
  });
});

describe('@xxx-generate-cli/utils, copyTo', () => {
  test('copy file to new file', () => {
    const newDestination = path.resolve(__dirname, './new-demo.json');
    copyTo([path.resolve(__dirname, './demo.json')], newDestination);
    const exist = fs.existsSync(newDestination);
    expect(exist).toBeTruthy();
  });
});

describe('@xxx-generate-cli/utils,extendPackageJSON', () => {
  test('extendPackageJSON', () => {
    return extendPackageJSON(require.resolve('./demo.json'), {
      // eslint-disable-next-line unicorn/prevent-abbreviations
      devDependencies: {
        typescript: '^3.6.3',
        'ts-node': '^8.4.1',
        '@babel/core': '^7.6.2',
        '@babel/preset-env': '^7.6.2',
        '@babel/preset-typescript': '^7.6.0',
      },
    }).then((result) => {
      return expect(result).toEqual({
        name: 'xxx-demo',
        version: '1.0.0',
        description: '',
        main: 'index.js',
        scripts: { test: 'echo "Error: no test specified" && exit 1' },
        keywords: [],
        author: '',
        license: 'ISC',
        // eslint-disable-next-line unicorn/prevent-abbreviations
        devDependencies: {
          '@commitlint/config-conventional': '^8.2.0',
          '@commitlint/cli': '^8.2.0',
          husky: '^3.0.5',
          typescript: '^3.6.3',
          'ts-node': '^8.4.1',
          '@babel/core': '^7.6.2',
          '@babel/preset-env': '^7.6.2',
          '@babel/preset-typescript': '^7.6.0',
        },
      });
    });
  });
});
