import extendPkg from './extend-pkg.json';
import path from 'path';
import {
  extendWorkingDirectoryPackageJson,
  copyTo,
} from '@xxx-generate-cli/utils';

/**
 * 安装lintstage
 * @export
 * @param {string} destinationPath 目标路径
 * @returns {void}
 */
export function installLintStageTo(destinationPath: string): void {
  const lintConfigPath = path.resolve(__dirname, 'lint-staged.config.js');
  copyTo([lintConfigPath], destinationPath);

  extendWorkingDirectoryPackageJson(extendPkg);
}
