import { COLORS } from './COLORS';
import type { Color, PaletteBuilded } from '../../Theme';

const makeColor = (prefix: string): Color => ({
  main: `#${prefix}-main`,
  dark: `#${prefix}-dark`,
  light: `#${prefix}-light`,
  opacity: `#${prefix}-opacity`,
  contrastText: `#${prefix}-contrast`,
});

const makePalette = (): PaletteBuilded => ({
  mode: 'light',
  divider: '#divider',

  text: {
    primary: '#text-primary',
    secondary: '#text-secondary',
    disabled: '#text-disabled',
  },

  background: {
    paper: '#bg-paper',
    default: '#bg-default',
  },

  grey: makeColor('g'),
  primary: makeColor('p'),
  secondary: makeColor('s'),
  info: makeColor('i'),
  warning: makeColor('w'),
  error: makeColor('e'),
  success: makeColor('ok'),
});

describe('COLORS', () => {
  it('should return all palette color variations (main, dark, light) in the correct order', () => {
    const palette = makePalette();

    const result = COLORS(palette);

    expect(result).toEqual([
      // primary
      '#p-main', '#p-dark', '#p-light',
      // secondary
      '#s-main', '#s-dark', '#s-light',
      // info
      '#i-main', '#i-dark', '#i-light',
      // warning
      '#w-main', '#w-dark', '#w-light',
      // error
      '#e-main', '#e-dark', '#e-light',
      // success
      '#ok-main', '#ok-dark', '#ok-light',
    ]);
  });

  it('should always return 18 values (6 colors × 3 variations)', () => {
    const palette = makePalette();

    expect(COLORS(palette)).toHaveLength(18);
  });

  it('should ignore opacity and contrastText variations', () => {
    const palette = makePalette();

    const result = COLORS(palette);

    expect(result).not.toContain('#p-opacity');
    expect(result).not.toContain('#p-contrast');
    expect(result).not.toContain('#s-opacity');
    expect(result).not.toContain('#s-contrast');
  });
});
