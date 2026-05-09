import type { HTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { joinClass } from '@iziui/core/utils';

import useResize from '@/hooks/useResize';
import createComponent from '@/core/createComponent';

import '@iziui/styles/components/Container.scss';

type Width = string | number;

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
  sm?: Width;
  md?: Width;
  lg?: Width;
}

const Container = forwardRef<HTMLElement, ContainerProps>(
  function Container({
    sm = '100%',
    md = 750,
    lg = 950,
    children,
    tag = 'div',
    ...props
  }, ref) {
    const [width, setWidth] = useState<Width>(0);

    const MAP = { sm, lg, md };

    const className = joinClass(
      props.className
    );

    useResize({
      onXs: () => setWidth(MAP['sm']),
      onSm: () => setWidth(MAP['md']),
      onMd: () => setWidth(MAP['md']),
      onLg: () => setWidth(MAP['lg']),
      onXl: () => setWidth(MAP['lg']),
    });

    const CustomTag = tag;

    return (
      <CustomTag
        {...props}
        ref={ref}
        style={{
          width: '100%',
          maxWidth: width,
          margin: 'auto',
          ...props.style
        }}
        className={className}
      >
        {children}
      </CustomTag>
    );
  }
);

export default createComponent(Container);
