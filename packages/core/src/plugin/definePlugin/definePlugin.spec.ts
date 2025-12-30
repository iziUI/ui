import definePlugin from './definePlugin';

describe('definePlugin', () => {
  it('should return the same callback reference', () => {
    const cb = jest.fn(() => ({ display: 'block' }));

    const plugin = definePlugin(cb as any);

    expect(plugin).toBe(cb);
  });

  it('should forward theme and options to the callback', () => {
    const theme = { colors: { primary: '#ff0000' } } as any;
    const options = { darkMode: true } as any;

    const cb = jest.fn(() => ({
      color: theme.colors.primary,
      display: 'block',
    }));

    const plugin = definePlugin(cb as any);

    const result = plugin(theme, options);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(theme, options);
    expect(result).toEqual({ color: '#ff0000', display: 'block' });
  });
});
