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
      a: [{ c: 3 }, { f: 5 }],
    }).then((result) => {
      return expect(result).toEqual({ a: [{ b: 2, c: 3 }, { d: 4, f: 5 }] });
    });
  });
});
