/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';
/**
 * 添加操作
 * @export
 * @param {string} library 第三方库
 * @param {Record<string, any>} [options={}] 额外的选项
 * @returns {void}
 */
export default function add(
  library: string,
  options: Record<string, any> = {},
): void {
  console.log(chalk.cyan('安装storybook'));
  // let type = argues[0];
  // console.log(library, options);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const importModule = require(`./lib/${library}`);
  if (importModule && importModule.default) {
    importModule.default(process.cwd(), options);
  } else {
    chalk.red(`暂不支持${library}`);
  }
}

/* eslint-enable */
