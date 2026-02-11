import { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { MappedColors, Size } from '@iziui/core/theme';
import { convertPathToColor, joinClass } from '@iziui/core/utils';

import createComponent from '../../core/createComponent';
import { useTheme } from '../../theme';

// import '@iziui/styles/components/Icon.scss';

export interface IconProps extends HTMLAttributes<HTMLElement> { name: string; size?: Size; color?: MappedColors; }
function Icon({ name, size = 'medium', color = 'primary.main', ...props }: IconProps) {
  const { theme: { palette } } = useTheme();

  const clss = joinClass(
    `${prefix}-icon`,
    `${prefix}-icon--${size}`,
    'uil',
    `uil-${name}`,
    props.className
  );

  const c = convertPathToColor(color, palette);

  return (
    <i {...props} className={clss} style={{ color: c, ...props.style }}></i>
  );
}

export default createComponent(Icon);