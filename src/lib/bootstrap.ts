// import { logger } from '../utils/logger';
import commander, { Command } from 'commander';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');
import { XxxCommand } from './command-run';
// import { logger } from '../utils/logger';

/**
 * 获取有效的环境字符串
 * @param {string} environment 带验证的字符串
 * @returns {string} 有效环境字符串，目前只支持react
 */
function getValidEnvironment(environment: string): string {
  const validEnvironment = ['react'];
  const lowerEnvironment = String(environment).toLowerCase();
  if (validEnvironment.includes(lowerEnvironment)) {
    return lowerEnvironment;
  }

  // 最基本的配置
  return 'base';
}

const program = new commander.Command();
program.version(packageJson.version);

program
  .command('init [env]')
  .description('init the project, env can be react | node, default is react')
  // eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/no-unused-vars
  .action(function(env = 'react', cmdObj: Command) {
    //
    // logger.log(`env = ${getValidEnvironment(env)}`);
    // 执行命令
    XxxCommand.run('init', getValidEnvironment(env));
  });

program
  .command('clone [source] [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    // 参数验证
    // logger.log('clone command called', source, destination);
  });

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
