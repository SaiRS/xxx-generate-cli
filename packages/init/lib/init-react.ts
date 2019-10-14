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
  // installWebpack,
} from '@xxx-generate-cli/add';

/**
 * 初始化react环境
 * @export
 * @returns {void}
 */
export function initReact(): void {
  const cwd = process.cwd();

  // 开发ide环境
  installEditorConfigTo(cwd);

  // 语言
  installTypeScriptTo(cwd);
  installSassTo();

  // 书写规则
  installEslintTo(cwd);
  installPrettierTo(cwd);
  installStyleLintTo(cwd);

  // 提交规则
  installCommitLintTo(cwd);
  installLintStageTo(cwd);

  // 运行环境
  installBrowserlistTo();

  // 框架
  installReact();

  // 测试框架
  installJestTo(cwd);

  // // 打包
  // installWebpack(cwd);
}
