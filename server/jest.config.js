/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/jest-setup.js",
    "<rootDir>/__tests__/jest-teardown.js",
  ],
  testEnvironment: "node",
  verbose: true,
  globalSetup: "<rootDir>/__tests__/jest-setup.js",
  globalTeardown: "<rootDir>/__tests__/jest-teardown.js",
};
