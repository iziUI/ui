import { forwardRef, type HTMLAttributes } from 'react';

import createComponent from '@/core';

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
}

const Box = forwardRef<HTMLElement, BoxProps>(
  function Box({ tag = 'div', children, ...props }, ref) {
    const CustomTag = tag;

    return (
      <CustomTag ref={ref} {...props}>
        {children}
      </CustomTag>
    );
  }
);

export default createComponent(Box);