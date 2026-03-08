import type { CSSProperties, HtmlHTMLAttributes } from 'react';

import type { IntRange } from '@iziui/toolkit/interface';

export type Size = {
  xs: IntRange<0, 13>;
  sm: IntRange<0, 13>;
  md: IntRange<0, 13>;
  lg: IntRange<0, 13>;
  xl: IntRange<0, 13>;
};

export type GridBaseProps = HtmlHTMLAttributes<HTMLElement> & Partial<Size>;

export type GridItemBaseProps = GridBaseProps & {
  gridColumnStart?: IntRange<1, 13>;
  gridRowStart?: IntRange<1, 13>;
  alignSelf?: CSSProperties['alignSelf'];
};
