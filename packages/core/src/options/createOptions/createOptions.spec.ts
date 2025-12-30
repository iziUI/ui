import createOptions from './createOptions';

describe('createOptions', () => {
  const theme = { palette: { primary: '#ff0000' } } as any;
  const sx = { color: () => '#00ff00' } as any;

  it('should return an empty object when no plugins are provided', () => {
    const result = createOptions({ sx, theme });

    expect(result).toEqual({});
  });

  it('should call each plugin with (theme, sx) and merge returned styles', () => {
    const plugin1 = jest.fn().mockReturnValue({ color: 'red', display: 'block' });
    const plugin2 = jest.fn().mockReturnValue({ backgroundColor: 'black' });

    const result = createOptions({ sx, theme }, plugin1 as any, plugin2 as any);

    expect(plugin1).toHaveBeenCalledTimes(1);
    expect(plugin1).toHaveBeenCalledWith(theme, sx);

    expect(plugin2).toHaveBeenCalledTimes(1);
    expect(plugin2).toHaveBeenCalledWith(theme, sx);

    expect(result).toEqual({
      color: 'red',
      display: 'block',
      backgroundColor: 'black',
    });
  });

  it('should let later plugins override earlier ones on key conflict', () => {
    const plugin1 = jest.fn().mockReturnValue({ color: 'red', opacity: 0.5 });
    const plugin2 = jest.fn().mockReturnValue({ color: 'blue' });

    const result = createOptions({ sx, theme }, plugin1 as any, plugin2 as any);

    expect(result).toEqual({
      color: 'blue',   // sobrescreveu
      opacity: 0.5,
    });
  });

  it('should not mutate plugin return objects (merges into new object each time)', () => {
    const styles1 = { color: 'red' };
    const styles2 = { background: 'black' };

    const plugin1 = jest.fn().mockReturnValue(styles1);
    const plugin2 = jest.fn().mockReturnValue(styles2);

    const result = createOptions({ sx, theme }, plugin1 as any, plugin2 as any);

    // não garante deep immutability, mas garante que o resultado é um novo objeto
    expect(result).not.toBe(styles1);
    expect(result).not.toBe(styles2);

    // e o conteúdo bate
    expect(result).toEqual({ color: 'red', background: 'black' });
  });
});