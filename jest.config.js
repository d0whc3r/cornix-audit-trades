module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          sourceMap: true,
          inlineSourceMap: true,
        },
        diagnostics: true,
      },
    ],
  },
  testMatch: ['**/tests/**/*.spec.ts'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      // branches: 70,
      // functions: 80,
      // lines: 80
      // statements: -10
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  cache: false,
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: ['default', 'jest-junit'],
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['./jest.setup-after-env.js'],
  testEnvironment: 'node',
}
