#!/usr/bin/env node

/* eslint-disable node/shebang, @typescript-eslint/ban-ts-ignore */

// @ts-ignore
import importLocal from 'import-local';
// @ts-ignore
import updateNotifier from 'update-notifier';
import semver from 'semver';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');
import { logger } from '../utils/logger';

if (importLocal(__filename)) {
  throw new Error('import local');
}

process.title = 'xxx-generate-cli';

// 注册更新
const notifier = updateNotifier({
  // eslint-disable-next-line unicorn/prevent-abbreviations
  pkg: packageJson,
  updateCheckInterval: 1000 * 60 * 60 * 24 * 30, // 1 month
});

if (notifier.update) {
  logger.info(`Update available: ${notifier.update.latest}`);
}

// 版本检查
const version = packageJson.engines.node;
if (!semver.satisfies(process.version, version)) {
  // eslint-disable-next-line no-useless-escape
  const rawVersion = version.replace(/[^\d\.]*/, '');
  logger.error(
    'xxx-generate CLI requires at least Node v' +
      rawVersion +
      '. ' +
      'You have ' +
      process.version +
      '.\n',
  );
} else {
  // eslint-disable-next-line node/no-missing-require
  require('../lib/bootstrap');
}

/* eslint-enable */
