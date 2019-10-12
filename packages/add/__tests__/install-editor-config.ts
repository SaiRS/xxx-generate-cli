import { installEditorConfigTo } from '../lib/editor-config';
import fs from 'fs';
import path from 'path';

describe('test installEditorConfig', () => {
  test('copy editorconfig', () => {
    installEditorConfigTo(__dirname);

    const filePath = path.resolve(__dirname, '.editorconfig');
    expect(fs.existsSync(filePath)).toBeTruthy();
  });
});
