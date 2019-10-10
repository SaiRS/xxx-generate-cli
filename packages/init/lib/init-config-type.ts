
// import is from 'is';

// export enum EEnvironment {
//   React = 'react',
//   Node = 'node'
// };

// /**
//  * 初始化项目配置的类型
//  * @export
//  * @interface IFInitConfig
//  */
// export interface IFInitConfig {
//   /**
//    * 项目的环境类型
//    * @type {EEnvironment} 初始化项目为指定环境
//    *
//    * 例：
//    *
//    *  设置为react，则会将项目初始化为react的开发环境
//    * @memberof IFInitConfig
//    */
//   enviroment: EEnvironment;
// }

// /**
//  * 获取默认的配置
//  * @export
//  * @returns {IFInitConfig} 初始化配置
//  */
// export function getDefaultInitConfig(): IFInitConfig {
//   return {
//     enviroment: EEnvironment.React,
//   };
// }

// export function getValidEnvironment(uncheckedEnv: any): EEnvironment {
//   if (is.string(uncheckedEnv)) {
//     switch(uncheckedEnv) {
//       case EEnvironment.React:
//       case EEnvironment.Node:
//         return uncheckedEnv as EEnvironment;

//       default:
//         return EEnvironment.React;
//     }
//   }

//   return EEnvironment.React;
// }
