import { extendWorkingDirectoryPackageJson } from '@xxx-generate-cli/utils';

import extendJson from './extend-pkg.json';

/**
 * 安装sass
 * @export
 * @param {string} destination 目标路径
 * @returns {void}
 */
export function installSassTo(): void {
  extendWorkingDirectoryPackageJson(extendJson);
}
