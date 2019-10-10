/* eslint-disable @typescript-eslint/no-explicit-any */
import spawn from 'cross-spawn';
import path from 'path';
import fs from 'fs';
import { prompt } from 'inquirer';
import chalk from 'chalk';
import { logger } from '../utils/logger';

export class XxxCommand {
  /**
   * 执行xxx-generate-cli定义的命令
   * 如 init type=
   * @static
   * @memberof XxxCommand
   * @param {string} command cli输入的命令, 如init, add等
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

  static getPackageNameFromCommand(command: string): string {
    return `@xxx-generate-cli/${command}`;
  }

  /**
   * 验证模块是否存在，如果存在，返回模块的module的路径，否则返回false
   * @static
   * @param {string} command
   * @returns {(string | false)} string表示模块对应的module路径, false表示没有找到该模块
   * @memberof XxxCommand
   */
  static validateEnvironment(command: string): string | false {
    return (
      this._validateLocalEnvironment(command) ||
      this._validateGlobalEnvironment(command)
    );
  }

  static _validateLocalEnvironment(command: string): string | false {
    try {
      // 本地
      const pathForCmd = path.resolve(
        process.cwd(),
        'node_modules',
        this.getPackageNameFromCommand(command),
      );
      require.resolve(pathForCmd);
      return pathForCmd;
    } catch (error_) {
      return false;
    }
  }

  static _validateGlobalEnvironment(command: string): string | false {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const globalModules = require('global-modules');
      const pathForCmd = path.resolve(
        globalModules,
        this.getPackageNameFromCommand(command),
      );

      require.resolve(pathForCmd);
      return pathForCmd;
    } catch (error_) {
      return false;
    }
  }

  /**
   * 执行shell命令
   * @static
   * @param {string} command
   * @param {...string[]} argues
   * @returns {Promise<void>}
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
   *
   * @static
   * @param {string} scopeName
   * @param {string[]} argues
   * @returns
   * @memberof XxxCommand
   */
  static async promptInstallation(scopeName: string): Promise<any> {
    const isYarn = fs.existsSync(path.resolve(process.cwd(), 'yarn.lock'));
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
