const { pathsToModuleNameMapper } = require('ts-jest');
const tsConfig = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    ...(tsConfig?.compilerOptions?.paths
      ? pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
          prefix: '<rootDir>/../',
        })
      : {}),
    ...{
      '@mocks/*': ['./__mocks__/*'],
    },
  },
};
