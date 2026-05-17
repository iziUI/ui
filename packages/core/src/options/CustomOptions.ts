import type { PaletteBuilded } from '../theme';

export type CustomOptions = Partial<
  & ColorOptions
  & ShapeOptions
  & SpacingOptions
  & BehaviorOptions
>;

type Size = 'sm' | 'md' | 'lg';

type Spacing = 'p' | 'py' | 'px' | 'pt' | 'pb' | 'pl' | 'pr' | 'm' | 'my' | 'mx' | 'mt' | 'mb' | 'ml' | 'mr';
type SpacingOptions = { [S in Spacing]: number; }

type ShapeOptions = {
  borderRadius: number;
};

type ColorOptions = {
  color: (palette: PaletteBuilded) => string;
  background: (palette: PaletteBuilded) => string;
  borderColor: (palette: PaletteBuilded) => string;
  backgroundColor: (palette: PaletteBuilded) => string;
}

type BehaviorOptions = {
  boxShadow: Size;
}