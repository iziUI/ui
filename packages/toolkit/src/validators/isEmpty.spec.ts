import { isEmpty } from './isEmpty';

describe('isEmpty', () => {
  it.each([
    ['empty string', ''],
    ['zero', 0],
    ['undefined', undefined],
    ['false', false],
  ])('returns true for %s', (_, value) => {
    expect(isEmpty(value)).toBe(true);
  });

  it.each([
    ['non-empty string', 'hello'],
    ['positive number', 1],
    ['true', true],
    ['object', {}],
    ['array', []],
    // typeof null === 'object', so isEmpty treats it as non-empty
    ['null', null],
  ])('returns false for %s', (_, value) => {
    expect(isEmpty(value)).toBe(false);
  });
});
