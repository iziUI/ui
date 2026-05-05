import { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';

import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Icon.scss';

export interface IconProps extends HTMLAttributes<HTMLElement> {
  name: string;
  size?: number;
}

function Icon({ name, size = 24, ...props }: IconProps) {
  const clss = joinClass(
    `${prefix}-icon`,
    'uil',
    `uil-${name}`,
    props.className
  );

  return (
    <i {...props} className={clss} style={{ fontSize: size, ...props.style }}></i>
  );
}

export default createComponent(Icon);