import {
  installCommitLintTo,
  installEditorConfigTo,
  installTypeScriptTo,
  installEslintTo,
  installPrettierTo,
} from '@xxx-generate-cli/add';

/**
 * 初始化react环境
 * @export
 * @returns {void}
 */
export function initReact(): void {
  const cwd = process.cwd();
  installCommitLintTo(cwd);
  installEditorConfigTo(cwd);
  installTypeScriptTo(cwd);
  installEslintTo(cwd);
  installPrettierTo(cwd);
}
