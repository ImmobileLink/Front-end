
import type { Config } from '@jest/types'
/** @type {import('ts-jest').JestConfigWithTsJest} */
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: './test/coverage',
  coverageReporters: ['json', 'html', 'lcov'],
  collectCoverageFrom: [
    './src/**/*.{js,ts}',
    './src/**/*.unit.test.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/vendor/**',
  ],
  transform: {
     "^.+\\.js$": ['babel-jest', { configFile: './babel.config.testing.js' }],
     "^.+\\.ts$": "ts-jest",
     "^.+\\.tsx$": "ts-jest",
  },
  setupFiles: ["<rootDir>/.jest/env.js"],
  moduleNameMapper: {
    "react": 'next/dist/compiled/react/cjs/react.development.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]s$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}
export default config