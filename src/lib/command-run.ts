/* eslint-disable @typescript-eslint/no-explicit-any */
import spawn from 'cross-spawn';
import path from 'path';
import fs from 'fs';
import { prompt } from 'inquirer';
import chalk from 'chalk';
import globalDirectories from 'global-dirs';
import { logger } from '../utils/logger';

/**
 * 命令，对spawn一些操作的封装，主要用于执行shell任务
 * @export
 * @class XxxCommand
 */
export class XxxCommand {
  /**
   * 执行xxx-generate-cli定义的命令
   * 如 init type=
   * @static
   * @memberof XxxCommand
   * @param {string} command cli输入的命令, 如init, add等
   * @returns {Promise<any>} promise of any
   */
  public static async run(command: string, ...argues: string[]): Promise<any> {
    let modulePath = this.validateEnvironment(command);
    const scopeName = this.getPackageNameFromCommand(command);
    if (!modulePath) {
      modulePath = await this.promptInstallation(scopeName);
    }
    // 加载对应的模块
    if (modulePath) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(`${modulePath}`).default(argues);
    } else {
      return null;
    }
  }

  /**
   * 获取命令对应的包的名字
   * @static
   * @param {string} command xxx-generate-cli指定的命令名
   * @example
   *  shell命令： xxx-generate-cli init, init为command
   * @returns {string} npm package name
   * @memberof XxxCommand
   */
  static getPackageNameFromCommand(command: string): string {
    return `@xxx-generate-cli/${command}`;
  }

  /**
   * 验证模块是否存在，如果存在，返回模块的module的路径，否则返回false
   * @static
   * @param {string} command xxx-generate-cli指定的命令名
   * @returns {(string | false)} string表示模块对应的module路径, false表示没有找到该模块
   * @memberof XxxCommand
   */
  static validateEnvironment(command: string): string | false {
    return (
      this._validateLocalEnvironment(command) ||
      this._validateGlobalEnvironment(command)
    );
  }

  /**
   * 返回command对应的本地安装的package的路径，如果不存在，则返回false
   * @static
   * @param {string} command xxx-generate-cli指定的命令名
   * @returns {(string | false)} 不存在对应的命令，则返回false,否则返回对应的package的路径
   * @memberof XxxCommand
   */
  static _validateLocalEnvironment(command: string): string | false {
    try {
      // 本地
      const pathForCmd = path.resolve(
        process.cwd(),
        'node_modules',
        this.getPackageNameFromCommand(command),
      );
      logger.info('local module path', pathForCmd);
      require.resolve(pathForCmd);
      return pathForCmd;
    } catch (error_) {
      return false;
    }
  }

  /**
   * 返回command对应的全局安装的package的路径，如果不存在，则返回false
   * @static
   * @param {string} command xxx-generate-cli指定的命令名
   * @returns {(string | false)} 不存在对应的命令，则返回false,否则返回对应的package的路径
   * @memberof XxxCommand
   */
  static _validateGlobalEnvironment(command: string): string | false {
    try {
      const isYarn = this.isUseYarn();
      let prefix = '';
      if (isYarn) {
        prefix = globalDirectories.yarn.packages;
      } else {
        prefix = globalDirectories.npm.packages;
      }

      const pathForCmd = path.resolve(
        prefix,
        this.getPackageNameFromCommand(command),
      );
      logger.info('global module path', pathForCmd);
      require.resolve(pathForCmd);
      return pathForCmd;
    } catch (error_) {
      return false;
    }
  }

  /**
   * 执行shell命令
   * @static
   * @param {string} command shell命令
   * @param {...string[]} argues shell命令的参数
   * @returns {Promise<void>} void
   * @memberof XxxCommand
   */
  public static runShellCommand(
    command: string,
    ...argues: string[]
  ): Promise<void> {
    const executedCommand = spawn.spawn(command, argues, {
      stdio: 'inherit',
      shell: true,
    });

    return new Promise((resolve, reject): void => {
      executedCommand.on('error', (error: Error) => {
        reject(error);
      });

      executedCommand.on('exit', (code: number) => {
        code;
        resolve();
      });
    });
  }

  /**
   * 判断本地是否有yarn模块
   * @static
   * @memberof XxxCommand
   * @returns {boolean} true表示本地有yarn模块
   */
  static isUseYarn(): boolean {
    const _isYarn = fs.existsSync(path.resolve(process.cwd(), 'yarn.lock'));
    return _isYarn;
  }

  /**
   * 提示安装名字为scopeName的包
   * @static
   * @param {string} scopeName 包名
   * @returns {Promise<any>} Promise
   * @memberof XxxCommand
   */
  static async promptInstallation(scopeName: string): Promise<any> {
    const isYarn = this.isUseYarn();
    const packageManager = isYarn ? 'yarn' : 'npm';
    const options = [isYarn ? 'add' : 'install', '-D', scopeName];

    const commandToBeRun = `${packageManager} ${options.join(' ')}`;
    logger.error(
      `The command moved into a separate package: ${chalk.keyword('orange')(
        scopeName,
      )}\n`,
    );
    const question = `Would you like to install ${scopeName}? (That will run ${chalk.green(
      commandToBeRun,
    )})`;
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'installConfirm',
        message: question,
        default: 'Y',
        choices: ['Yes', 'No', 'Y', 'N', 'y', 'n'],
      },
    ]);

    if (answer.installConfirm === true) {
      await this.runShellCommand(commandToBeRun);
      return this.validateEnvironment(name);
    }
    process.exitCode = -1;
  }
}
/* eslint-enable */
