import {
  extendWorkingDirectoryPackageJson,
  copyTo,
} from '@xxx-generate-cli/utils';
import extendJson from './extend.json';
import path from 'path';

/**
 * 安装webpack
 * @export
 * @param {string} destination 目标路径
 * @returns {void}
 */
export function installWebpack(destination: string): void {
  extendWorkingDirectoryPackageJson(extendJson);

  const webpackConfigPath = path.resolve(__dirname, 'webpack.config.js');
  const configsPath = path.resolve(__dirname, 'configs');
  copyTo([webpackConfigPath, configsPath], destination);
}
