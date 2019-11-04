import {
  XXXInitConfig,
  getDefaultInitConfig,
  getValidEnvironment,
} from './init-config-type';

/**
 * 将数组类型(shell输入)的参数转换成对象类型的参数表示
 * @export
 * @param {...any[]} arguements 参数列表
 * @returns {IFInitConfig} 参数配置
 */
export function toInitConfigFromArray(...arguements: any[]): XXXInitConfig {
  return {
    ...getDefaultInitConfig(),
    enviroment: getValidEnvironment(arguements[0]),
    options: arguements[1] || {},
  };
}
