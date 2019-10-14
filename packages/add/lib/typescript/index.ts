import {
  extendWorkingDirectoryPackageJson,
  copyTo,
} from '@xxx-generate-cli/utils';
import extendJson from './extend.json';
import path from 'path';

/**
 * 安装typescript
 * @export
 * @param {string} destination 目标路径
 * @returns {void}
 */
export function installTypeScriptTo(destination: string): void {
  extendWorkingDirectoryPackageJson(extendJson);

  const tsconfigJsonPath = path.resolve(__dirname, 'tsconfig.json');
  const babelConfigPath = path.resolve(__dirname, 'babel.config.js');
  copyTo([tsconfigJsonPath, babelConfigPath], destination);
}
