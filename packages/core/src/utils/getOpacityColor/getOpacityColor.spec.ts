import { getOpacityColor } from './getOpacityColor';

describe('getOpacityColor', () => {
  it('should add full opacity to a 6-digit hex color', () => {
    const result = getOpacityColor('#ff0000', 1);

    // 1 * 255 = 255 -> FF
    expect(result).toBe('#ff0000FF');
  });

  it('should add zero opacity to a 6-digit hex color', () => {
    const result = getOpacityColor('#00ff00', 0);

    // 0 * 255 = 0 -> 00
    expect(result).toBe('#00ff0000');
  });

  it('should correctly convert opacity to hex with rounding', () => {
    const result = getOpacityColor('#0000ff', 0.5);

    // 0.5 * 255 = 127.5 -> arredonda para 128 -> 80
    expect(result).toBe('#0000ff80');
  });

  it('should expand 3-digit hex color and apply opacity', () => {
    const result = getOpacityColor('#abc', 0.25);

    // #abc -> #aabbcc
    // 0.25 * 255 = 63.75 -> 40
    expect(result).toBe('#aabbcc40');
  });

  it('should return alpha channel in uppercase', () => {
    const result = getOpacityColor('#ffffff', 0.1);

    // 0.1 * 255 = 25.5 -> 1A
    expect(result.endsWith('1A')).toBe(true);
  });

  it('should throw an error for invalid hex color', () => {
    expect(() => {
      getOpacityColor('red', 0.5);
    }).toThrow('Cor inválida');
  });

  it('should throw an error for malformed hex value', () => {
    expect(() => {
      getOpacityColor('#12345', 0.5);
    }).toThrow(Error);
  });
});
