// 为了让ts编译后的目录中有package.json文件，因此
import packageJson from '../package.json';
packageJson;

export * from './commit-lint';
export * from './editor-config';
export * from './typescript';
export * from './eslint';
export * from './prettier';
