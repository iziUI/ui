import { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { MappedColors } from '@iziui/core/theme';
import { convertPathToColor, joinClass } from '@iziui/core/utils';

import createComponent from '../../core/createComponent';
import { useTheme } from '../../theme';

import '@iziui/styles/components/Icon.scss';

export interface IconProps extends HTMLAttributes<HTMLElement> {
  name: string;
  size?: number;
  color?: MappedColors;
}

function Icon({ name, size = 24, color = 'primary.main', ...props }: IconProps) {
  const { theme: { palette } } = useTheme();

  const clss = joinClass(
    `${prefix}-icon`,
    'uil',
    `uil-${name}`,
    props.className
  );

  const c = convertPathToColor(color, palette);

  return (
    <i {...props} className={clss} style={{ color: props.style?.color || c, fontSize: size, ...props.style }}></i>
  );
}

export default createComponent(Icon);