import type { PaletteBuilded } from '../theme';

export type CustomOptions = Partial<
  & ColorOptions
  & { fullWidth: boolean }
>;

type ColorOptions = {
  color: (palette: PaletteBuilded) => string;
  background: (palette: PaletteBuilded) => string;
  borderColor: (palette: PaletteBuilded) => string;
  backgroundColor: (palette: PaletteBuilded) => string;
}

export type Sx<T> = T & {
  sx?: CustomOptions;
} 