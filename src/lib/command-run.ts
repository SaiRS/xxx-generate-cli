/* eslint-disable @typescript-eslint/no-unused-vars, require-atomic-updates, @typescript-eslint/explicit-function-return-type, @typescript-eslint/await-thenable, @typescript-eslint/no-explicit-any */
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
  public static async run(command: string, ...argues: any[]): Promise<any> {
    let modulePath = this.validateEnvironment(command);
    const scopeName = `@xxx-generate-cli/${command}`;
    if (!modulePath) {
      // TODO:
      modulePath = await XxxCommand.promptInstallation(scopeName, name);
    }
    // 加载对应的模块
    return modulePath ? require(`${modulePath}`).default(argues) : null;
  }

  /**
   * 验证模块是否存在，如果存在，返回模块的module的路径，否则返回false
   * @static
   * @param {string} extensionName
   * @returns {(string | false)} string表示模块对应的module路径, false表示没有找到该模块
   * @memberof XxxCommand
   */
  static validateEnvironment(extensionName: string): string | false {
    try {
      const pathForCmd = path.resolve(
        process.cwd(),
        'node_modules',
        'xxx-generate-cli',
        extensionName,
      );
      require.resolve(pathForCmd);
      return pathForCmd;
    } catch (error_) {
      return false;
    }
  }

  public static runCommand(command: string, ...argues: string[]) {
    // return Promise.resolve();
    // new Promise((resolve, reject) => {
    //   resolve();
    // });
    return;

    // const executedCommand = spawn.spawn(command, argues, {
    //   stdio: 'inherit',
    //   shell: true,
    // });

    // return new Promise((resolve, reject) => {
    //   executedCommand.on('error', (error: Error) => {
    //     reject(error);
    //   });

    //   executedCommand.on('exit', (code: number) => {
    //     resolve();
    //   });
    // });
  }

  /**
   *
   * @static
   * @param {string} scopeName
   * @param {string} name
   * @returns
   * @memberof XxxCommand
   */
  static async promptInstallation(
    scopeName: string,
    name: string,
  ): Promise<any> {
    const isYarn = fs.existsSync(path.resolve(process.cwd(), 'yarn.lock'));
    const packageManager = isYarn ? 'yarn' : 'npm';
    const options = [isYarn ? 'add' : 'install', '-D', scopeName];

    const commandToBeRun = `${packageManager} ${options.join(' ')}`;
    logger.error(
      `The command moved into a separate package: ${chalk.keyword('orange')(
        name,
      )}\n`,
    );
    const question = `Would you like to install ${name}? (That will run ${chalk.green(
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
      await this.runCommand(commandToBeRun);
      return this.validateEnvironment(name);
    }
    process.exitCode = -1;
  }
}
/* eslint-enable */
