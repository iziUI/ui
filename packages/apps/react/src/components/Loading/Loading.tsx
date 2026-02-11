import { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { MappedColors } from '@iziui/core/theme';
import { convertPathToColor, joinClass } from '@iziui/core/utils';

import createComponent from '../../core/createComponent';
import { useTheme } from '../../theme';

// import '@iziui/styles/components/Loading.scss';

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  color?: MappedColors;
  size?: number | string;
}
function Loading({ color = 'primary.main', size = '1.5rem', ...props }: LoadingProps) {
  const { theme: { palette } } = useTheme();

  const c = convertPathToColor(color, palette);

  const className = joinClass(`${prefix}-loading`, props.className);

  return (
    <span {...props} className={className} style={{ ...props, color: c, width: size, height: size }}>
      <svg className={`${prefix}-loading__svg`} viewBox="22 22 44 44">
        <circle className={`${prefix}-loading__circle`} cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
      </svg>
    </span>
  );
}

export default createComponent(Loading);