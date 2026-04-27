import { isValidEmail } from './isValidEmail';

describe('isValidEmail', () => {
  it.each([
    'user@example.com',
    'user.name@domain.com',
    'user+tag@domain.co.uk',
    'user123@sub.domain.org',
  ])('returns true for valid email "%s"', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['missing @', 'invalidemail.com'],
    ['missing domain', 'user@'],
    ['missing user', '@domain.com'],
    ['missing TLD', 'user@domain'],
    ['spaces in email', 'user @domain.com'],
  ])('returns false for %s', (_, email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});
