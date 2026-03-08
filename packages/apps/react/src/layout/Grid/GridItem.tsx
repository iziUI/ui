
import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import type { GridItemBaseProps } from './interface';

import './Grid.scss';

export interface GridItemProps extends GridItemBaseProps {
  children: React.ReactNode;
}

export function GridItem({
  children,
  gridColumnStart,
  gridRowStart,
  alignSelf,
  xl = 1,
  lg,
  md,
  sm,
  xs,
  ...props
}: Readonly<GridItemProps>) {
  const SIZES = {
    xl,
    lg: lg || xl,
    md: md || lg || xl,
    sm: sm || md || lg || xl,
    xs: xs || sm || md || lg || xl
  };

  const className = joinClass(
    'cds-grid__item',
    Object.entries(SIZES)
      .map(([size, value]) => {
        return `${prefix}-grid__item--${size}-${value}`;
      })
      .join(' '),
    props.className
  );

  return (
    <div
      {...props}
      className={className}
      style={{
        gridColumnStart,
        gridRowStart,
        alignSelf,
        ...props.style
      }}
    >
      {children}
    </div>
  );
}
