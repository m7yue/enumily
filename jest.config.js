/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  coveragePathIgnorePatterns: ['/examples/', '/node_modules/'],
  collectCoverageFrom: ['packages/*/src/**/*.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/examples/'],
};