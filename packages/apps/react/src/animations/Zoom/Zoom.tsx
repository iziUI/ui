import {
  useState,
  useEffect,
  type ElementType,
  type HTMLAttributes,
} from 'react';

export type Style = HTMLAttributes<HTMLDivElement>['style'];

const easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const styledShow = (timeout: number): Style => ({
  opacity: 1,
  transform: 'scale(1)',
  transition: `all ${timeout}s ${easing}`,
});

const styledHide = (timeout: number): Style => ({
  opacity: 0,
  transform: 'scale(0.85)',
  transition: `all ${timeout}s ${easing}`,
});

export interface ZoomProps extends HTMLAttributes<HTMLDivElement> {
  enter: boolean;
  delay?: number;
  timeout?: number;
  tag?: ElementType;
}

export default function Zoom({
  enter,
  children,
  tag = 'div',
  delay = 50,
  timeout = .35,
  ...props
}: ZoomProps) {
  const CustomTag = tag;

  const [style, setStyle] = useState<Style>(styledHide(timeout));

  useEffect(() => {
    setTimeout(() => {
      setStyle(enter ? styledShow(timeout) : styledHide(timeout));
    }, delay);
  }, [enter, delay, timeout]);

  return (
    <CustomTag {...props} style={{ ...style, ...props.style }}>
      {children}
    </CustomTag>
  );
}
