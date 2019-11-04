/* eslint-disable unicorn/prevent-abbreviations, @typescript-eslint/no-explicit-any */
import { IStorybookOptions } from './type';

/**
 * 获得storybook有关的package.json配置
 * @param {IStorybookOptions} [options={}] options
 * @returns {Record<string, any>} 配置
 */
export function generateStorybookRelativePackage(
  options: IStorybookOptions = {},
): Record<string, any> {
  const config = {
    dependencies: {},

    devDependencies: {
      typescript: '^3.6.3',
      '@storybook/addon-actions': '^5.2.5',
      '@storybook/addon-links': '^5.2.5',
      '@storybook/addons': '^5.2.5',
      '@storybook/addon-viewport': '^5.0.10',
      'babel-loader': '^8.0.6',
    },
    scripts: {
      storybook: 'start-storybook -p 6006',
      'build-storybook': 'build-storybook',
    },
  };

  if (options.react) {
    // eslint-disable-next-line compat/compat
    config.devDependencies = Object.assign({}, config.devDependencies, {
      '@storybook/react': '^5.2.5',
      '@types/storybook__react': '^4.0.1',
    });
  }

  return config;
}

/* eslint-enable */
