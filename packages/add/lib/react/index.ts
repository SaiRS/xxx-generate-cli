import { extendWorkingDirectoryPackageJson } from '@xxx-generate-cli/utils';
import extendJson from './extend.json';

/**
 * 安装react
 * @export
 * @returns {void}
 */
export function installReact(): void {
  extendWorkingDirectoryPackageJson(extendJson);
}
