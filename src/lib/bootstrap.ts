// import { logger } from '../utils/logger';
import commander, { Command } from 'commander';
import packageJson from '../../package.json';
import { XxxCommand } from './command-run';

function getValidEnvironment(environment: string): string {
  const validEnvironment = ['react'];
  const lowerEnvironment = String(environment).toLowerCase();
  if (validEnvironment.includes(lowerEnvironment)) {
    return lowerEnvironment;
  }

  return 'react';
}

const program = new commander.Command();
program.version(packageJson.version);

// arguments
// program.arguments('init <>');

program
  .command('init [env]')
  .description('init the project, env can be react | node, default is react')
  // eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/no-unused-vars
  .action(function(env = 'react', cmdObj: Command) {
    //
    console.log(`env = ${getValidEnvironment(env)}`);
    // 执行命令
    XxxCommand.run('init', getValidEnvironment(env));
  });

program
  .command('clone [source] [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    // 参数验证

    console.log('clone command called', source, destination);
  });

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
