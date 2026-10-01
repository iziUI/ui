import { useMemo, type HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors } from '@iziui/core/theme';
import { convertPathToColor, joinClass } from '@iziui/core/utils';

import createComponent from '../../core/createComponent';
import { useTheme } from '../../theme';

import '@iziui/styles/components/Loading.scss';

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  color?: Colors;
  size?: number | string;
}
function Loading({
  color = 'primary',
  size = '1.5rem',
  role = 'status',
  style,
  ...props
}: LoadingProps) {
  const { theme: { palette } } = useTheme();

  const c = convertPathToColor(`${color}.main`, palette);

  const className = joinClass(`${prefix}-loading`, props.className);
  const ariaLabel = props['aria-label'];
  const ariaLabelledBy = props['aria-labelledby'];
  const resolvedAriaLabel = useMemo(() => {
    if (ariaLabel || ariaLabelledBy) { return ariaLabel; }

    return 'Loading';
  }, [ariaLabel, ariaLabelledBy]);

  return (
    <span
      {...props}
      role={role}
      aria-label={resolvedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      style={{ ...style, color: c, width: size, height: size }}
    >
      <svg className={`${prefix}-loading__svg`} viewBox="22 22 44 44">
        <circle className={`${prefix}-loading__circle`} cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
      </svg>
    </span>
  );
}

export default createComponent(Loading);
