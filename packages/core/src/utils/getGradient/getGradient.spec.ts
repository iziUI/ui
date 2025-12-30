import { getLinearGradient } from './getGradient';
import { adjustLightness } from '../adjustLightness';
import { hexToHsl } from '../hexToHsl/hexToHsl';

jest.mock('../adjustLightness', () => ({
  adjustLightness: jest.fn(),
}));

jest.mock('../hexToHsl/hexToHsl', () => ({
  hexToHsl: jest.fn(),
}));

describe('getLinearGradient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should build a linear-gradient using the base hex and 2 lighter variations', () => {
    const baseHex = '#112233';

    (hexToHsl as jest.Mock).mockReturnValue({ h: 210, s: 40, l: 30 });

    // 1ª chamada (variation = 5) e 2ª chamada (variation*2 = 10)
    (adjustLightness as jest.Mock)
      .mockReturnValueOnce('#223344')
      .mockReturnValueOnce('#334455');

    const result = getLinearGradient(baseHex);

    expect(hexToHsl).toHaveBeenCalledTimes(1);
    expect(hexToHsl).toHaveBeenCalledWith(baseHex);

    expect(adjustLightness).toHaveBeenCalledTimes(2);
    expect(adjustLightness).toHaveBeenNthCalledWith(1, 210, 40, 30, 5);
    expect(adjustLightness).toHaveBeenNthCalledWith(2, 210, 40, 30, 10);

    expect(result).toBe(
      'linear-gradient(to right, #112233, #223344, #334455)'
    );
  });
});
