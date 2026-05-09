import { useEffect, useState } from 'react';

export type Direction = 'left' | 'right' | 'top' | 'bottom';

export type Style = React.HTMLAttributes<HTMLDivElement>['style'];

const styledShow = (timeout: number): Style => ({
  transform: 'translate(0, 0)',
  transition: `transform ${timeout}s ease-in-out`,
});

const styledBounce = (timeout: number, direction: Direction): Style => {
  const translate = {
    top: 'translate(0, -10px)',
    left: 'translate(-10px, 0)',
    right: 'translate(10px, 0)',
    bottom: 'translate(0, 10px)',
  };

  return {
    transform: translate[direction],
    transition: `transform ${timeout}s ease-in-out`,
  };
};

export interface BounceProps extends React.HTMLAttributes<HTMLDivElement> {
  enter: boolean;
  delay?: number;
  timeout?: number;
  direction?: Direction;
  tag?: React.ElementType;
}

export default function Bounce({
  enter,
  children,
  tag = 'div',
  delay = 50,
  timeout = 0.2,
  direction = 'right',
  ...props
}: BounceProps) {
  const CustomTag = tag;

  const [style, setStyle] = useState<Style>(styledShow(timeout));

  useEffect(() => {
    if (!enter) return;

    setTimeout(() => {
      setStyle(styledBounce(timeout, direction));
      setTimeout(() => {
        setStyle(styledShow(timeout));
      }, timeout * 1000);
    }, delay);
  }, [enter, delay, timeout, direction]);

  return (
    <CustomTag {...props} style={{ ...style, ...props.style }}>
      {children}
    </CustomTag>
  );
}
