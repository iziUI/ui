import { adjustLightness } from './adjustLightness';
import { hslToHex } from '../hslToHex';

describe('adjustLightness', () => {
  it('should increase lightness by amount', () => {
    // base: HSL(0, 100%, 40%) -> vermelho mais escuro
    const result = adjustLightness(0, 100, 40, 10);

    // HSL(0, 100%, 50%) -> vermelho puro
    expect(result).toBe('#ff0000');
  });

  it('should decrease lightness by amount', () => {
    // base: HSL(0, 100%, 60%) -> vermelho mais claro
    const result = adjustLightness(0, 100, 60, -10);

    // HSL(0, 100%, 50%) -> vermelho puro
    expect(result).toBe('#ff0000');
  });

  it('should clamp lightness to 100 when amount exceeds upper bound', () => {
    const result = adjustLightness(0, 100, 90, 50);

    // HSL(0, 100%, 100%) -> branco
    expect(result).toBe('#ffffff');
  });

  it('should clamp lightness to 0 when amount exceeds lower bound', () => {
    const result = adjustLightness(0, 100, 10, -50);

    // HSL(0, 100%, 0%) -> preto
    expect(result).toBe('#000000');
  });

  it('should not mutate original h, s, l values externally', () => {
    const h = 120;
    const s = 50;
    const l = 50;

    const result = adjustLightness(h, s, l, 0);

    // lightness inalterada, apenas conversão
    expect(result).toBe(hslToHex(120, 50, 50));
  });
});