import { sanitizeOnlyNumbers } from './normalize';

describe('sanitizeOnlyNumbers', () => {
  it('removes all non-digit characters', () => {
    expect(sanitizeOnlyNumbers('abc123def')).toBe('123');
  });

  it('returns unchanged string when input is already numeric', () => {
    expect(sanitizeOnlyNumbers('123')).toBe('123');
  });

  it('returns empty string when there are no digits', () => {
    expect(sanitizeOnlyNumbers('no-numbers!')).toBe('');
  });

  it('strips formatting from a phone number', () => {
    expect(sanitizeOnlyNumbers('(11) 99999-9999')).toBe('11999999999');
  });

  it('returns empty string for empty input', () => {
    expect(sanitizeOnlyNumbers('')).toBe('');
  });
});
