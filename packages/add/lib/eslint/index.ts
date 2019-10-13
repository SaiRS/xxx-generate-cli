import {
  extendWorkingDirectoryPackageJson,
  copyTo,
} from '@xxx-generate-cli/utils';
import extendJson from './template/extend.json';
import path from 'path';

/**
 * 安装eslint
 * @export
 * @param {string} destinationPath 目标路径
 * @returns {void}
 */
export function installEslintTo(destinationPath: string): void {
  extendWorkingDirectoryPackageJson(extendJson);

  const eslintrcPath = path.resolve(__dirname, '.eslintrc.js');
  const eslintignorePath = path.resolve(__dirname, '.eslintignore');
  copyTo([eslintrcPath, eslintignorePath], destinationPath);
}
