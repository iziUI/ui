import { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';
import type { Colors } from '@iziui/core/theme';

import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Icon.scss';

export interface IconProps extends HTMLAttributes<HTMLElement> {
  name: string;
  size?: number;
  color?: Colors;
}

function Icon({ name, color, size = 24, ...props }: IconProps) {
  const clss = joinClass(
    `${prefix}-icon`,
    color && `${prefix}-icon--${color}`,
    'uil',
    `uil-${name}`,
    props.className
  );

  return (
    <i {...props} className={clss} style={{ fontSize: size, ...props.style }}></i>
  );
}

export default createComponent(Icon);