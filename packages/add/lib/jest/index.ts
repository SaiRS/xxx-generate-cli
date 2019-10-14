import {
  extendWorkingDirectoryPackageJson,
  copyTo,
} from '@xxx-generate-cli/utils';
import path from 'path';
import extendJson from './extend-pkg.json';

/**
 * 安装jest
 * @export
 * @param {string} destinationPath 目标路径
 * @returns {void}
 */
export function installJestTo(destinationPath: string): void {
  extendWorkingDirectoryPackageJson(extendJson);

  const jestConfigPath = path.resolve(__dirname, 'jest.config.js');
  copyTo([jestConfigPath], destinationPath);
}
