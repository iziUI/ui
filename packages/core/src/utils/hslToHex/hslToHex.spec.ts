import { hslToHex } from './hslToHex';

describe('hslToHex', () => {
  it('should convert pure red correctly', () => {
    // HSL(0, 100%, 50%) → #ff0000
    expect(hslToHex(0, 100, 50)).toBe('#ff0000');
  });

  it('should convert pure green correctly', () => {
    // HSL(120, 100%, 50%) → #00ff00
    expect(hslToHex(120, 100, 50)).toBe('#00ff00');
  });

  it('should convert pure blue correctly', () => {
    // HSL(240, 100%, 50%) → #0000ff
    expect(hslToHex(240, 100, 50)).toBe('#0000ff');
  });

  it('should convert white correctly', () => {
    // HSL(any, 0%, 100%) → #ffffff
    expect(hslToHex(0, 0, 100)).toBe('#ffffff');
  });

  it('should convert black correctly', () => {
    // HSL(any, 0%, 0%) → #000000
    expect(hslToHex(0, 0, 0)).toBe('#000000');
  });

  it('should convert gray correctly', () => {
    // HSL(any, 0%, 50%) → #808080
    expect(hslToHex(0, 0, 50)).toBe('#808080');
  });

  it('should convert yellow correctly', () => {
    // HSL(60, 100%, 50%) → #ffff00
    expect(hslToHex(60, 100, 50)).toBe('#ffff00');
  });

  it('should convert cyan correctly', () => {
    // HSL(180, 100%, 50%) → #00ffff
    expect(hslToHex(180, 100, 50)).toBe('#00ffff');
  });

  it('should convert magenta correctly', () => {
    // HSL(300, 100%, 50%) → #ff00ff
    expect(hslToHex(300, 100, 50)).toBe('#ff00ff');
  });

  it('should always return a valid hex color format', () => {
    const result = hslToHex(210, 50, 40);

    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });
});