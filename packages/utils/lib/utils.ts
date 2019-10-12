/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires */
import { merge } from 'lodash';
import fs from 'fs';
import pathModule from 'path';
import spawn from 'cross-spawn';
const loadJsonFile = require('load-json-file');
import shell from 'shelljs';

/**
 * 扩展对象
 * @export
 * @param {Record<string, any>} sourceJson 原始对象
 * @param {Record<string, any>} extend 扩展对象
 * @returns {Record<string, any>} 经过扩展的新对象
 */
export function extendJSON(
  sourceJson: Record<string, any>,
  extend: Record<string, any>,
): Record<string, any> {
  // eslint-disable-next-line prefer-const
  let temporary = {
    ...sourceJson,
  };

  return merge(temporary, extend);
}

/**
 * 将json对象写入文件
 * @export
 * @param {Record<string, any>} json json对象
 * @param {string} path 文件路径
 * @returns {void}
 * @throws NodeJS.ErrnoException
 */
export function writeJsonToPath(json: Record<string, any>, path: string): void {
  fs.writeFile(
    path,
    JSON.stringify(json),
    (error: NodeJS.ErrnoException | null) => {
      if (error) {
        throw error;
      } else {
        // 进行一个prettier
        const localPretter = pathModule.resolve(
          __dirname,
          '../node_modules/.bin/prettier',
        );
        const command = `${localPretter} ${path} --write`;
        spawn.spawn(command, [], {
          stdio: 'inherit',
          shell: true,
        });
      }
    },
  );
}

/**
 * 将packagePath路径下的文件进行扩展
 * @export
 * @param {string} packagePath package.json文件路径
 * @param {Record<string, any>} extend 增加的json数据
 * @returns {Promise<void>} void
 */
export async function extendPackageJSON(
  packagePath: string,
  extend: Record<string, any>,
): Promise<Record<string, any>> {
  const json = (await loadJsonFile(packagePath)) as Record<string, any>;
  const result = extendJSON(json, extend);
  writeJsonToPath(result, packagePath);
  return result;
}

/**
 * shell复制文件的封装
 * @export
 * @param {string[]} source 文件或者文件夹的集合，可以有通配符
 * @param {string} destination 目标路径
 * @returns {boolean} true表示成功
 */
export function copyTo(source: string[], destination: string): boolean {
  shell.cp('-u', source, destination);
  return true;
}

/* eslint-enable */
