import spawn from 'cross-spawn';

// 为了让ts编译后的目录中有package.json文件，因此
import packageJson from '../package.json';
packageJson;

/**
 *
 * 安装webpack模块
 * @returns {void} void
 */
function installWebpack(): void {
  spawn.spawn('npm', ['install', '--save-dev', 'webpack']);
}

/**
 * 初始化项目
 * @export
 * @param {...string[]} arguements 初始化项目的参数
 * 参数说明:
 * 0:
 * @returns {void}
 */
export default function init(...arguements: string[]): void {
  // eslint-disable-next-line no-console
  console.log(
    'Finially, I came to this point. Cheer for myself.',
    arguements[0],
  );

  installWebpack();
}

// function initProject(config: Object): void {

// }
