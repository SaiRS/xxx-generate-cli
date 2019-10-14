import {
  extendWorkingDirectoryPackageJson,
  copyTo,
} from '@xxx-generate-cli/utils';
import exntedJson from './template/extend-pkg.json';
import path from 'path';

/**
 * 安装stylelint
 * @export
 * @param {string} destinationPath 目标路径
 * @returns {void}
 */
export function installStyleLintTo(destinationPath: string): void {
  extendWorkingDirectoryPackageJson(exntedJson);

  const stylelintIgnorePath = path.resolve(
    __dirname,
    './template/.stylelintignore',
  );
  const stylelintrcPath = path.resolve(__dirname, './template/.stylelintrc.js');
  copyTo([stylelintIgnorePath, stylelintrcPath], destinationPath);
}
