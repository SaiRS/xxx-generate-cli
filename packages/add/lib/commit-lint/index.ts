import {
  copyTo,
  extendWorkingDirectoryPackageJson,
} from '@xxx-generate-cli/utils';
import path from 'path';
import extendJson from './extend.json';

/**
 * 安装commint lint
 * @description 实现中的.huskyrc.js中带上了'pre-commit': 'lint-staged',
 *   这是为了减少实现的难度，不然要重写.huskyrc.js还是有点麻烦
 * @export
 * @param {string} destinationPath 目标路径，一般为process.cwd();
 * @returns {void} void
 */
export function installCommitLintTo(destinationPath: string): void {
  const commintLintSource = path.resolve(__dirname, '.commitlintrc.js');
  const huskyrcSource = path.resolve(__dirname, '.huskyrc.js');
  const versionRcSource = path.resolve(__dirname, '.versionrc.js');
  copyTo([commintLintSource, huskyrcSource, versionRcSource], destinationPath);

  extendWorkingDirectoryPackageJson(extendJson);
}
