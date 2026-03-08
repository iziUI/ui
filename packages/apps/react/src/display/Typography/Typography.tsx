import type { PropsWithChildren, HTMLAttributes, JSX, CSSProperties } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { MappedColors } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';
import { convertPathToColor } from '@iziui/core/utils/convertPathToColor';

import { useTheme } from '@/theme';
import createComponent from '@/core/createComponent';

import '@iziui/styles/components/Typography.scss';

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2';

const MAP: { [x: string]: React.ElementType } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
};

interface TypographyProps extends PropsWithChildren<HTMLAttributes<HTMLParagraphElement>> {
  variant?: Variant;
  color?: MappedColors;
  textAlign?: CSSProperties['textAlign'];
  weight?: 'bold' | 'normal' | 'light';
}
function Typography({
  children,
  variant = 'body1',
  color = 'text.primary',
  weight,
  textAlign,
  ...props
}: TypographyProps) {
  const { theme: { palette } } = useTheme();

  const CustomTag = MAP[variant];

  const cls = joinClass(
    `${prefix}-typography`,
    `${prefix}-typography--${variant}`,
    weight && `${prefix}-typography--weight-${weight}`,
    props.className
  );

  const c = convertPathToColor(color, palette);

  return (
    <CustomTag
      {...props}
      className={cls}
      style={{
        color: c,
        textAlign,
        ...props.style
      }}
    >
      {children}
    </CustomTag>
  );
}

export default createComponent(Typography);