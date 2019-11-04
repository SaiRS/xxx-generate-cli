import { IStorybookOptions } from './type';
import { generateStorybookRelativePackage } from './extend-package';

import path from 'path';
import {
  extendWorkingDirectoryPackageJson,
  copyTo,
} from '@xxx-generate-cli/utils';
/*
 * @Author: xjiaxiang86@gmail.com
 * @Date: 2019-11-04 15:35:06
 * @Last Modified by: xjiaxiang86@gmail.com
 * @Last Modified time: 2019-11-04 16:32:21
 */

/**
 * 安装storybook
 * @export
 * @param {string} destination 安装的目录
 * @param {IStorybookOptions} [options={}] 其他的参数
 * @returns {void}
 */
export default function installStoryBook(
  destination: string,
  options: IStorybookOptions = {},
): void {
  if (options.react) {
    const packageJson = generateStorybookRelativePackage(options);
    extendWorkingDirectoryPackageJson(packageJson);

    const dotStorybookPath = path.resolve(__dirname, './templates/.storybook');
    const storiesPath = path.resolve(__dirname, './templates/stories');
    // 复制
    copyTo([dotStorybookPath, storiesPath], destination);
  }

  // else do nothing
}

export { installStoryBook };
