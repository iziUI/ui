import { convertPathToColor } from './convertPathToColor';

describe('convertPathToColor', () => {
  it('should return top-level color when path has one segment', () => {
    const palette = {
      primary: '#ff0000',
    } as any;

    expect(convertPathToColor('primary' as any, palette)).toBe('#ff0000');
  });

  it('should return nested color when path exists (2 levels)', () => {
    const palette = {
      primary: {
        500: '#111111',
      },
    } as any;

    expect(convertPathToColor('primary.500' as any, palette)).toBe('#111111');
  });

  it('should fallback to root palette[key] when nested key does not exist in acc', () => {
    const palette = {
      primary: {
        500: '#111111',
      },
      // <- existe no nível raiz
      600: '#222222',
    } as any;

    // primary.600 -> primary existe, mas não tem 600
    // então cai no "return palette[key]" (nível raiz) => palette["600"]
    expect(convertPathToColor('primary.600' as any, palette)).toBe('#222222');
  });

  it('should fallback to root palette[nextKey] when first segment does not exist', () => {
    const palette = {
      500: '#abcdef',
    } as any;

    // unknown.500:
    // 1) unknown => palette["unknown"] (undefined)
    // 2) como acc é falsy, retorna palette["500"]
    expect(convertPathToColor('unknown.500' as any, palette)).toBe('#abcdef');
  });

  it('should return undefined (at runtime) if nothing matches', () => {
    const palette = {
      primary: {
        500: '#111111',
      },
    } as any;

    // primary.700:
    // primary existe, mas não tem 700 e também não existe palette["700"] no root
    expect(convertPathToColor('primary.700' as any, palette)).toBeUndefined();
  });
});