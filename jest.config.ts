
import type { Config } from '@jest/types'
/** @type {import('ts-jest').JestConfigWithTsJest} */
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'html', 'lcov'],
  collectCoverageFrom: [
    './src/**/agenda/*.{js,ts,tsx,jsx}',
    './src/**/feed/*.{js,ts,tsx,jsx}',
    './src/**/pesquisa/*.{js,ts,tsx,jsx}',
    './src/**/denuncia/[id]/*.{js,ts,tsx,jsx}',
    './src/**/auth/*.{js,ts,tsx,jsx}',
    './src/**/imovel/*.{js,ts,tsx,jsx}',
    './src/**/perfil/[id]/*.{js,ts,tsx,jsx}',
    './src/**/plano/*.{js,ts,tsx,jsx}',
    './src/**/survey/*.{js,ts,tsx,jsx}',
    './src/**/chat/[[...idsala]]/*.{js,ts,tsx,jsx}',
    './src/**/(navbar)/*.{js,ts,tsx,jsx}',
    './src/**/(navbar)/*.{js,ts,tsx,jsx}',   
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/vendor/**',
  ],

  transform: {
    '\\.tsx$': ['babel-jest', { configFile: './babel.config.testing.js' }],
    '\\.ts$': ['babel-jest', { configFile: './babel.config.testing.js' }],
    // "\\.tsx?$": "babel-jest",
    // "\\.ts?$": "babel-jest",
    // '\\.tsx?$': ["ts-jest", {
    //   babelConfig: true
    // }],
    // '\\.ts?$': ["ts-jest", {
    //   babelConfig: true
    // }],
  },
  setupFiles: ["<rootDir>/.jest/env.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!test-component).+\\.js$"
  ], 
  moduleNameMapper: {
    "react": 'next/dist/compiled/react/cjs/react.development.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
export default config