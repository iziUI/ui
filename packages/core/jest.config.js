/* eslint-disable */
const { name } = require('./package.json');

module.exports = {
  displayName: name,
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: [
    "<rootDir>/dist",
    '.*__mocks__.*'
  ]
};