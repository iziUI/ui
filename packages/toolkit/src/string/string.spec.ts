import { capitalize, getInitials, sanitize, slug } from './string';

describe('String', () => {
  describe('sanitize', () => {
    it('lowercases and trims the value', () => {
      expect(sanitize('  Hello World  ')).toBe('hello world');
    });

    it('removes accents', () => {
      expect(sanitize('café')).toBe('cafe');
    });

    it('removes special characters', () => {
      expect(sanitize('hello! world?')).toBe('hello world');
    });
  });

  describe('getInitials', () => {
    it('returns initials for a simple name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('uses first and last word for multi-word names', () => {
      expect(getInitials('Jane Mary Doe')).toBe('JD');
    });

    it('uses first two letters for a single-word name', () => {
      expect(getInitials('Leozinho')).toBe('LE');
    });

    it('ignores leading and trailing spaces', () => {
      expect(getInitials('  Alan Turing  ')).toBe('AT');
    });

    it('handles accented characters', () => {
      expect(getInitials('álvaro de la Torre')).toBe('AT');
    });
  });

  describe('slug', () => {
    it('converts a phrase to a kebab-case slug', () => {
      expect(slug('Hello World')).toBe('hello-world');
    });

    it('removes accents', () => {
      expect(slug('Olá Mundo')).toBe('ola-mundo');
    });

    it('returns empty string for empty input', () => {
      expect(slug('')).toBe('');
    });

    it('collapses multiple spaces into a single dash', () => {
      expect(slug('Hello   World')).toBe('hello-world');
    });
  });

  describe('capitalize', () => {
    it('uppercases the first character', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('does not alter characters after the first', () => {
      expect(capitalize('hELLO')).toBe('HELLO');
    });

    it('returns empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });
  });
});