import defineColor from './defineColor';

describe('colorPlugin plugin', () => {
  const palette = {
    primary: '#ff0000',
    secondary: '#00ff00',
  };

  const theme = {
    palette,
  } as any;

  it('should return an empty object when color option is not provided', () => {
    const options = {} as any;

    const result = defineColor(theme, options);

    expect(result).toEqual({});
  });

  it('should return color style when color option is provided', () => {
    const colorFn = jest.fn().mockReturnValue('#00ff00');

    const options = {
      color: colorFn,
    } as any;

    const result = defineColor(theme, options);

    expect(colorFn).toHaveBeenCalledTimes(1);
    expect(colorFn).toHaveBeenCalledWith(palette);

    expect(result).toEqual({
      color: '#00ff00',
    });
  });

  it('should allow color function to return any valid CSS value', () => {
    const colorFn = jest.fn().mockReturnValue('inherit');

    const options = {
      color: colorFn,
    } as any;

    const result = defineColor(theme, options);

    expect(result).toEqual({
      color: 'inherit',
    });
  });
});
