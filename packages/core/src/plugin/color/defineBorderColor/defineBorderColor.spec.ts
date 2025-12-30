import defineBorderColor from './defineBorderColor';

describe('borderColorPlugin plugin', () => {
  const palette = {
    primary: '#ff0000',
    secondary: '#00ff00',
  };

  const theme = {
    palette,
  } as any;

  it('should return an empty object when borderColor option is not provided', () => {
    const options = {} as any;

    const result = defineBorderColor(theme, options);

    expect(result).toEqual({});
  });

  it('should return borderColor style when borderColor option is provided', () => {
    const borderColorFn = jest.fn().mockReturnValue('#ff0000');

    const options = {
      borderColor: borderColorFn,
    } as any;

    const result = defineBorderColor(theme, options);

    expect(borderColorFn).toHaveBeenCalledTimes(1);
    expect(borderColorFn).toHaveBeenCalledWith(palette);

    expect(result).toEqual({
      borderColor: '#ff0000',
    });
  });

  it('should allow borderColor function to return any valid CSS value', () => {
    const borderColorFn = jest.fn().mockReturnValue('currentColor');

    const options = {
      borderColor: borderColorFn,
    } as any;

    const result = defineBorderColor(theme, options);

    expect(result).toEqual({
      borderColor: 'currentColor',
    });
  });
});
