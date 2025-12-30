import { hexToHsl } from './hexToHsl';
import { hslToHex } from '../hslToHex';

const closeTo = (value: number, expected: number, precision = 5) => {
  expect(value).toBeCloseTo(expected, precision);
};

describe('hexToHsl', () => {
  it('should convert #ff0000 (red) correctly', () => {
    const { h, s, l } = hexToHsl('#ff0000');

    closeTo(h, 0);
    closeTo(s, 100);
    closeTo(l, 50);
  });

  it('should convert #00ff00 (green) correctly', () => {
    const { h, s, l } = hexToHsl('#00ff00');

    closeTo(h, 120);
    closeTo(s, 100);
    closeTo(l, 50);
  });

  it('should convert #0000ff (blue) correctly', () => {
    const { h, s, l } = hexToHsl('#0000ff');

    closeTo(h, 240);
    closeTo(s, 100);
    closeTo(l, 50);
  });

  it('should convert #ffffff (white) correctly', () => {
    const { h, s, l } = hexToHsl('#ffffff');

    // branco é acromático: h = 0 e s = 0
    closeTo(h, 0);
    closeTo(s, 0);
    closeTo(l, 100);
  });

  it('should convert #000000 (black) correctly', () => {
    const { h, s, l } = hexToHsl('#000000');

    closeTo(h, 0);
    closeTo(s, 0);
    closeTo(l, 0);
  });

  it('should convert #808080 (gray) correctly', () => {
    const { h, s, l } = hexToHsl('#808080');

    closeTo(h, 0);
    closeTo(s, 0);
    // 0x80 / 255 = 0.501960..., então l ~ 50.196...
    closeTo(l, 50.196078, 5);
  });

  it('should return values within expected ranges', () => {
    const { h, s, l } = hexToHsl('#7f33cc');

    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(360);

    expect(s).toBeGreaterThanOrEqual(0);
    expect(s).toBeLessThanOrEqual(100);

    expect(l).toBeGreaterThanOrEqual(0);
    expect(l).toBeLessThanOrEqual(100);
  });

  it('should roundtrip with hslToHex (within tolerance)', () => {
    // escolhi um tom arbitrário (não extremo) para reduzir chance de erro por arredondamento
    const original = '#3a7bd5';

    const hsl = hexToHsl(original);
    const back = hslToHex(hsl.h, hsl.s, hsl.l);

    // pode haver pequenas variações em casos específicos,
    // mas para essa cor a conversão deve bater exatamente
    expect(back).toBe(original);
  });
});