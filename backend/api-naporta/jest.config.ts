import dotenv from 'dotenv';
import type { Config } from 'jest';

dotenv.config();

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'src/coverage',
  coveragePathIgnorePatterns: ['main.ts', 'coverage/*', 'databases/*'],
  testEnvironment: 'node',
};

export default config;
