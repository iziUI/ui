import type { HTMLAttributes, CSSProperties } from 'react';
import { forwardRef } from 'react';

import { joinClass } from '@iziui/core/utils';

import createComponent from '@/core/createComponent';

// import '@iziui/styles/components/Stack.scss';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
  gap?: number;
  fullwidth?: boolean;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignSelf?: CSSProperties['alignSelf'];
  flexWrap?: CSSProperties['flexWrap'];
}

const Stack = forwardRef<HTMLElement, StackProps>(
  function Stack(
    {
      children,
      tag = 'div',
      gap = 16,
      alignSelf,
      flexWrap = 'nowrap',
      alignItems = 'flex-start',
      flexDirection = 'column',
      justifyContent = 'flex-start',
      ...props
    },
    ref
  ) {
    const stackClasses = joinClass(
      'iziui-stack',
      props.className
    );

    const CustomTag = tag;

    return (
      <CustomTag
        {...props}
        ref={ref}
        className={stackClasses}
        style={{
          gap,
          flexWrap,
          alignItems,
          alignSelf,
          flexDirection,
          justifyContent,
          ...props.style,
        }}
      >
        {children}
      </CustomTag>
    );
  }
);

export default createComponent(Stack);
