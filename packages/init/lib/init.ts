// import spawn from 'cross-spawn';

import { initReact } from './init-react';
import { initBase } from './init-base';
import { toInitConfigFromArray } from './to-init-config-adaptor';
import { EEnvironment } from './init-config-type';

/**
 * 安装webpack模块
 * @returns {void} void
 */
// function installWebpack(): void {
//   spawn.spawn('npm install --save-dev webpack', [], {
//     stdio: 'inherit',
//     shell: true,
//   });
// }

/**
 * 初始化项目
 * @export
 * @param {string} environment 初始化项目的参数
 * @param {Record<string, string>} [options={}] 额外的参数
 * 参数说明:
 * 0:
 * @returns {void}
 */
export default function init(
  environment: string,
  options: Record<string, any> = {},
): void {
  // // eslint-disable-next-line no-console
  // console.log('Finially, I came to this point. Cheer for myself.', arguements);
  const initConfig = toInitConfigFromArray(environment, options);
  switch (initConfig.enviroment) {
    case EEnvironment.React:
      initReact();
      break;

    case EEnvironment.Base:
    default:
      initBase();
      break;
  }
}

// function initProject(config: Object): void {

// }
