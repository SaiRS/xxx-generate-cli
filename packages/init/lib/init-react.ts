/* eslint-disable no-console */
import {
  installCommitLintTo,
  installEditorConfigTo,
  installTypeScriptTo,
  installEslintTo,
  installPrettierTo,
  installBrowserlistTo,
  installStyleLintTo,
  installLintStageTo,
  installSassTo,
  installJestTo,
  installReact,
  installWebpack,
} from '@xxx-generate-cli/add';
import chalk from 'chalk';

/**
 * 初始化react环境
 * @export
 * @returns {void}
 */
export function initReact(): void {
  const cwd = process.cwd();

  console.log(chalk.cyan('初始化react开发环境'));
  console.log();

  console.log('初始化', chalk.green('editorconfig'));
  // 开发ide环境
  installEditorConfigTo(cwd);

  // 语言
  console.log('初始化', chalk.green('typescript'));
  installTypeScriptTo(cwd);
  console.log('初始化', chalk.green('sass'));
  installSassTo();

  // 书写规则
  console.log('初始化', chalk.green('eslint'));
  installEslintTo(cwd);
  console.log('初始化', chalk.green('prettier'));
  installPrettierTo(cwd);
  console.log('初始化', chalk.green('stylelint'));
  installStyleLintTo(cwd);

  // 提交规则
  console.log('初始化', chalk.green('commitlint'));
  installCommitLintTo(cwd);
  console.log('初始化', chalk.green('lint-staged'));
  installLintStageTo(cwd);

  // 运行环境
  installBrowserlistTo(cwd);

  // 框架
  console.log('初始化', chalk.green('react'));
  installReact();

  // 测试框架
  console.log('初始化', chalk.green('jest'));
  installJestTo(cwd);

  // // 打包
  console.log('初始化', chalk.green('webpack'));
  installWebpack(cwd);

  console.log();
  console.log(chalk.cyan('初始化完成'));
  console.log('接下来，你需要执行', chalk.yellow('npm install'), '开始吧');
  console.log();
}
/* eslint-enable */
