const flag = '[xxx-generate-cli]';
export const logger = {
  log: console.log.bind(console, flag),
  info: console.info.bind(console, flag),
  warn: console.warn.bind(console, flag),
  error: console.error.bind(console, flag),
};
