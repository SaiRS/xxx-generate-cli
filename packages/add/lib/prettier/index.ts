import {
  extendWorkingDirectoryPackageJson,
  copyTo,
} from '@xxx-generate-cli/utils';
import extendJson from './extend.json';
import path from 'path';

/**
 * 安装prettier
 * @export
 * @param {string} destinationPath 目标路径
 * @returns {void}
 */
export function installPrettierTo(destinationPath: string): void {
  extendWorkingDirectoryPackageJson(extendJson);

  const prettierrcPath = path.resolve(__dirname, '.prettierrc.js');
  const prettierignorePath = path.resolve(__dirname, '.prettierignore');
  copyTo([prettierrcPath, prettierignorePath], destinationPath);
}
