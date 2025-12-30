import { joinClass } from './joinClass';

describe('joinClass', () => {
  it('should join valid class names with space', () => {
    const result = joinClass('btn', 'btn-primary', 'active');

    expect(result).toBe('btn btn-primary active');
  });

  it('should ignore null and undefined values', () => {
    const result = joinClass('btn', null, 'active', undefined);

    expect(result).toBe('btn active');
  });

  it('should ignore boolean values', () => {
    const result = joinClass('btn', false, true, 'active');

    expect(result).toBe('btn active');
  });

  it('should return empty string when all values are falsy', () => {
    const result = joinClass(null, undefined, false);

    expect(result).toBe('');
  });

  it('should handle a single valid class', () => {
    const result = joinClass('btn');

    expect(result).toBe('btn');
  });

  it('should handle no arguments', () => {
    const result = joinClass();

    expect(result).toBe('');
  });
});