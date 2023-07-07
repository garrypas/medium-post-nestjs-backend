/* eslint-disable @typescript-eslint/no-var-requires */
const jestConfig = require('../../jest.config.js');
delete jestConfig.rootDir;

module.exports = {
  ...jestConfig,
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.*.e2e-spec.ts$',
  setupFilesAfterEnv: ['<rootDir>/test/setup-jest-e2e.ts'],
};
