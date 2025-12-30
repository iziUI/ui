import { generateSupportColors } from './generateSupportColors';
import { hexToHsl } from '../hexToHsl';
import { adjustLightness } from '../adjustLightness';
import { getOpacityColor } from '../getOpacityColor';
import { getContrastColor } from '../getContrastColor/getContrastColor';

jest.mock('../hexToHsl/hexToHsl', () => ({
  hexToHsl: jest.fn(),
}));

jest.mock('../adjustLightness', () => ({
  adjustLightness: jest.fn(),
}));

jest.mock('../getOpacityColor', () => ({
  getOpacityColor: jest.fn(),
}));

jest.mock('../getContrastColor/getContrastColor', () => ({
  getContrastColor: jest.fn(),
}));

describe('generateSupportColors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate support colors based on base hex color', () => {
    const baseHex = '#3366ff';

    // mocks
    (hexToHsl as jest.Mock).mockReturnValue({ h: 220, s: 100, l: 60 });

    (adjustLightness as jest.Mock)
      .mockReturnValueOnce('#5c84ff') // lighter (+20)
      .mockReturnValueOnce('#0033cc'); // darker (-20)

    (getOpacityColor as jest.Mock).mockReturnValue('#3366ff33');
    (getContrastColor as jest.Mock).mockReturnValue('#ffffff');

    const result = generateSupportColors(baseHex);

    // chamadas
    expect(hexToHsl).toHaveBeenCalledTimes(1);
    expect(hexToHsl).toHaveBeenCalledWith(baseHex);

    expect(adjustLightness).toHaveBeenCalledTimes(2);
    expect(adjustLightness).toHaveBeenNthCalledWith(1, 220, 100, 60, 20);
    expect(adjustLightness).toHaveBeenNthCalledWith(2, 220, 100, 60, -20);

    expect(getOpacityColor).toHaveBeenCalledWith(baseHex, 0.2);
    expect(getContrastColor).toHaveBeenCalledWith(baseHex);

    // retorno
    expect(result).toEqual({
      main: baseHex,
      dark: '#0033cc',
      light: '#5c84ff',
      opacity: '#3366ff33',
      contrastText: '#ffffff',
    });
  });
});
