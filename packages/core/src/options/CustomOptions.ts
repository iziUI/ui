import type { Properties } from 'csstype';

import type { PaletteBuilded } from '../theme';

export type CustomOptions = Partial<
  & ColorOptions
>;

type ColorOptions = {
  color: (palette: PaletteBuilded) => string;
  background: (palette: PaletteBuilded) => string;
  borderColor: (palette: PaletteBuilded) => string;
  backgroundColor: (palette: PaletteBuilded) => string;
}

export type Sx<T> = T & {
  sx?: CustomOptions;
  fullWidth?: boolean;
  gap?: number;
  display?: Properties['display'];
  flexDirection?: Properties['flexDirection'];
  justifyContent?: Properties['justifyContent'];
  alignItems?: Properties['alignItems'];
  alignSelf?: Properties['alignSelf'];
  flexWrap?: Properties['flexWrap'];
} 