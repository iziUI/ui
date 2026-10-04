import type { CSSProperties, HtmlHTMLAttributes } from 'react';

import type { IntRange } from '@iziui/toolkit/interface';

/** A CSS grid span from 1 through 12 columns. */
export type GridSpan = IntRange<1, 13>;

export type Size = {
  /** Grid span from 1 through 12 columns at xs. Omitted values inherit from wider breakpoints. */
  xs: GridSpan;
  /** Grid span from 1 through 12 columns at sm. Omitted values inherit from wider breakpoints. */
  sm: GridSpan;
  /** Grid span from 1 through 12 columns at md. Omitted values inherit from wider breakpoints. */
  md: GridSpan;
  /** Grid span from 1 through 12 columns at lg. Omitted values inherit from wider breakpoints. */
  lg: GridSpan;
  /** Grid span from 1 through 12 columns at xl. Omitted values inherit from wider breakpoints. */
  xl: GridSpan;
};

export type GridBaseProps = HtmlHTMLAttributes<HTMLElement> & Partial<Size>;

export type GridItemBaseProps = GridBaseProps & {
  gridColumnStart?: IntRange<1, 13>;
  gridRowStart?: IntRange<1, 13>;
  alignSelf?: CSSProperties['alignSelf'];
  justifyItems?: CSSProperties['justifyItems'];
};
