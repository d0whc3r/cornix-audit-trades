module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/tests/**/*.spec.ts', '**/__test__/*.ts'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80
      // statements: -10
    }
  },
  cache: false,
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: ['default', 'jest-junit'],
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['./jest.setup-after-env.js'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: {
        sourceMap: true,
        inlineSourceMap: true
      },
      diagnostics: true
    }
  }
};
