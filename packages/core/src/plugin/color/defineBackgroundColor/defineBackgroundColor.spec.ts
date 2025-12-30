import defineBackgroundColor from './defineBackgroundColor';

describe('backgroundColorPlugin plugin', () => {
  const palette = {
    primary: '#ff0000',
    secondary: '#00ff00',
  };

  const theme = {
    palette,
  } as any;

  it('should return an empty object when backgroundColor option is not provided', () => {
    const options = {} as any;

    const result = defineBackgroundColor(theme, options);

    expect(result).toEqual({});
  });

  it('should return backgroundColor style when backgroundColor option is provided', () => {
    const backgroundColorFn = jest.fn().mockReturnValue('#00ff00');

    const options = {
      backgroundColor: backgroundColorFn,
    } as any;

    const result = defineBackgroundColor(theme, options);

    expect(backgroundColorFn).toHaveBeenCalledTimes(1);
    expect(backgroundColorFn).toHaveBeenCalledWith(palette);

    expect(result).toEqual({
      backgroundColor: '#00ff00',
    });
  });

  it('should allow backgroundColor function to return any valid CSS value', () => {
    const backgroundColorFn = jest.fn().mockReturnValue('transparent');

    const options = {
      backgroundColor: backgroundColorFn,
    } as any;

    const result = defineBackgroundColor(theme, options);

    expect(result).toEqual({
      backgroundColor: 'transparent',
    });
  });
});
