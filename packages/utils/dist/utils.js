'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires */
const lodash_1 = require('lodash');
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const cross_spawn_1 = __importDefault(require('cross-spawn'));
const loadJsonFile = require('load-json-file');
/**
 * 扩展对象
 * @export
 * @param {Record<string, any>} sourceJson 原始对象
 * @param {Record<string, any>} extend 扩展对象
 * @returns {Record<string, any>} 经过扩展的新对象
 */
function extendJSON(sourceJson, extend) {
  // eslint-disable-next-line prefer-const
  let temporary = Object.assign({}, sourceJson);
  return lodash_1.merge(temporary, extend);
}
exports.extendJSON = extendJSON;
/**
 * 将json对象写入文件
 * @export
 * @param {Record<string, any>} json json对象
 * @param {string} path 文件路径
 * @returns {void}
 * @throws NodeJS.ErrnoException
 */
function writeJsonToPath(json, path) {
  fs_1.default.writeFile(path, JSON.stringify(json), (error) => {
    if (error) {
      throw error;
    } else {
      // 进行一个prettier
      const localPretter = path_1.default.resolve(
        __dirname,
        '../node_modules/.bin/prettier',
      );
      const command = `${localPretter} ${path} --write`;
      // eslint-disable-next-line no-console
      // console.log('prettier', command);
      cross_spawn_1.default.spawn(command, [], {
        stdio: 'inherit',
        shell: true,
      });
    }
  });
}
exports.writeJsonToPath = writeJsonToPath;
/**
 * 将packagePath路径下的文件进行扩展
 * @export
 * @param {string} packagePath package.json文件路径
 * @param {Record<string, any>} extend 增加的json数据
 * @returns {Promise<void>} void
 */
function extendPackageJSON(packagePath, extend) {
  return __awaiter(this, void 0, void 0, function*() {
    const json = yield loadJsonFile(packagePath);
    const result = extendJSON(json, extend);
    writeJsonToPath(result, packagePath);
    return result;
  });
}
exports.extendPackageJSON = extendPackageJSON;
/* eslint-enable */
//# sourceMappingURL=utils.js.map
