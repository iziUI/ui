import type { HTMLAttributes } from 'react';

export interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.JSX.Element;
  value: number;
  current: number;
}

export default function TabContent({ children, value, current, ...props }: TabContentProps) {
  return (
    value === current && (
      <div {...props}>
        {children}
      </div>
    )
  );
}