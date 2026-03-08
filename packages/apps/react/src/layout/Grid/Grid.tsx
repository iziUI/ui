import { Children, cloneElement, ReactElement } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import type { GridItemProps } from './GridItem';
import type { GridBaseProps } from './interface';

import './Grid.scss';

export interface GridProps extends GridBaseProps {
  children: React.ReactNode;
  gap?: number;
}

export function Grid({
  children,
  sm,
  md,
  lg,
  xl,
  xs,
  gap = 15,
  ...props
}: Readonly<GridProps>) {
  const arrayChildren = Children.toArray(children) as ReactElement<GridItemProps>[];

  const className = joinClass(`${prefix}-grid`, props.className);

  const renderChildren = () => {
    return arrayChildren.map((child) => {
      const sizes = { sm, md, lg, xl, xs };

      return cloneElement(child, { ...sizes, ...child.props });
    });
  };

  return (
    <div {...props} className={className} style={{ gap, ...props.style }}>
      {renderChildren()}
    </div>
  );
}
