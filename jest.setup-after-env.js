// Jest extended => https://github.com/jest-community/jest-extended
const matchers = require('jest-extended');
// import * as matchers from 'jest-extended';
expect.extend(matchers);

// Jest chain => https://github.com/mattphillips/jest-chain
require('jest-chain');
// import 'jest-chain';

const JEST_TIMEOUT = 35 * 1000;

// eslint-disable-next-line no-undef
jest.setTimeout(JEST_TIMEOUT);

beforeEach(() => {
  expect.hasAssertions();
});
