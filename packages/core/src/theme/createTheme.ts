import { generateSupportColors } from '../utils';
import type { ThemeBuilded, ThemeOptions } from './Theme';
import { themeDefaultDark, themeDefaultLight } from './defaultTheme';

const SUPPORT_KEYS = [
  'primary',
  'secondary',
  'error',
  'warning',
  'success',
  'info',
  'grey',
] as const;

type SupportKey = (typeof SUPPORT_KEYS)[number];

export function createTheme(theme?: ThemeOptions): ThemeBuilded {
  const mode = theme?.palette?.mode ?? 'light';
  const ref = mode === 'dark' ? themeDefaultDark : themeDefaultLight;

  const paletteFromUser = theme?.palette ?? {};
  const paletteFromRef = ref.palette;

  const supportColors = Object.fromEntries(
    SUPPORT_KEYS.map((key) => [
      key,
      generateSupportColors(paletteFromUser[key] ?? paletteFromRef[key]),
    ])
  ) as Record<SupportKey, ThemeBuilded['palette'][SupportKey]>;

  return {
    palette: {
      mode,
      text: paletteFromUser.text ?? paletteFromRef.text,
      background: paletteFromUser.background ?? paletteFromRef.background,
      divider: paletteFromUser.divider ?? paletteFromRef.divider,
      ...supportColors,
    },
    shape: theme?.shape ?? ref.shape,
    spacing: theme?.spacing ?? ref.spacing,
  };
}