import { getContrastColor } from './getContrastColor';

describe('getContrastColor', () => {
  it('should return black for very light colors', () => {
    // branco puro
    expect(getContrastColor('#ffffff')).toBe('#000000');

    // amarelo claro
    expect(getContrastColor('#ffffcc')).toBe('#000000');
  });

  it('should return white for very dark colors', () => {
    // preto puro
    expect(getContrastColor('#000000')).toBe('#ffffff');

    // azul escuro
    expect(getContrastColor('#00008b')).toBe('#ffffff');
  });

  it('should return black for colors with luminance above threshold', () => {
    // cinza claro (~0.75 de luminância)
    expect(getContrastColor('#cccccc')).toBe('#000000');
  });

  it('should return white for colors with luminance below threshold', () => {
    // cinza médio/escuro
    expect(getContrastColor('#666666')).toBe('#ffffff');
  });

  it('should return white when luminance is exactly at or below threshold', () => {
    // valor próximo do limite (<= 0.6 → branco)
    expect(getContrastColor('#999999')).toBe('#ffffff');
  });

  it('should always return a valid hex color', () => {
    const result = getContrastColor('#3a7bd5');

    expect(result).toMatch(/^#(000000|ffffff)$/);
  });
});
