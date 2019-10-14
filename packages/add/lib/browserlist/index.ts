import pkg from './pkg.json';
import { extendWorkingDirectoryPackageJson } from '@xxx-generate-cli/utils';

/**
 * 安装browserlist
 * @export
 * @returns {void}
 */
export function installBrowserlistTo(): void {
  extendWorkingDirectoryPackageJson(pkg);
}
