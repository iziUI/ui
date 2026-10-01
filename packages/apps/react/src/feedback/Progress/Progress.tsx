import type { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';

import Box from '@/layout/Box';
import createComponent from '@/core/createComponent';
import type { Colors } from '@/theme';

import '@iziui/styles/components/Progress.scss';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  color?: Colors;
  percent: number;
}

function Progress({
  percent,
  color = 'primary',
  ...props
}: ProgressProps) {
  const className = joinClass(`${prefix}-progress`, props.className);
  const ariaValue = Math.min(Math.max(percent, 0), 100);

  return (
    <Box
      fullWidth
      {...props}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValue}
      className={className}
      sx={{
        backgroundColor: (palette) => palette[color].opacity,
        borderRadius: 1
      }}
    >
      <Box
        className={`${prefix}-progress__bar`}
        style={{ width: `${percent}%` }}
        sx={{
          background: (palette) => palette[color].main,
          borderRadius: 1
        }}
      />
    </Box>
  );
}

export default createComponent(Progress);
