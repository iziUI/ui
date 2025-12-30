import defineBackground from './defineBackground';

describe('backgroundPlugin plugin', () => {
  const palette = {
    primary: '#ff0000',
    secondary: '#00ff00',
  };

  const theme = {
    palette,
  } as any;

  it('should return an empty object when background option is not provided', () => {
    const options = {} as any;

    const result = defineBackground(theme, options);

    expect(result).toEqual({});
  });

  it('should return background style when background option is provided', () => {
    const backgroundFn = jest.fn().mockReturnValue('#ff0000');

    const options = {
      background: backgroundFn,
    } as any;

    const result = defineBackground(theme, options);

    expect(backgroundFn).toHaveBeenCalledTimes(1);
    expect(backgroundFn).toHaveBeenCalledWith(palette);

    expect(result).toEqual({
      background: '#ff0000',
    });
  });

  it('should allow background function to return any valid CSS value', () => {
    const backgroundFn = jest
      .fn()
      .mockReturnValue('linear-gradient(to right, red, blue)');

    const options = {
      background: backgroundFn,
    } as any;

    const result = defineBackground(theme, options);

    expect(result).toEqual({
      background: 'linear-gradient(to right, red, blue)',
    });
  });
});
