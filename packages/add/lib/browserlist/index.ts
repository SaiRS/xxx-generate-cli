// import pkg from './pkg.json';
// import { extendWorkingDirectoryPackageJson } from '@xxx-generate-cli/utils';
import path from 'path';
import { copyTo } from '@xxx-generate-cli/utils';

/**
 * 安装browserlist
 * @export
 * @param {string} destinationPath 目的路径
 * @returns {void}
 */
export function installBrowserlistTo(destinationPath: string): void {
  // extendWorkingDirectoryPackageJson(pkg);

  const configPath = path.resolve(__dirname, '.browserslistrc');
  copyTo([configPath], destinationPath);
}
