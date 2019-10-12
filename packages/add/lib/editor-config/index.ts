import { copyTo } from '@xxx-generate-cli/utils';
import path from 'path';

/**
 * 安装editor config配置
 * @description 具体实现为复制文件
 * @export
 * @param {string} destniationPath 目标路径
 * @returns {void} void
 */
export function installEditorConfigTo(destniationPath: string): void {
  const source = path.resolve(__dirname, '.editorconfig');
  copyTo([source], destniationPath);
}
