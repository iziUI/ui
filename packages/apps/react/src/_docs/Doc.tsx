import { HTMLAttributes } from 'react';

type DocProps = HTMLAttributes<HTMLDivElement>;

export default function Doc({ children, ...props }: DocProps) {
  return (
    <div {...props}>
      {children}
    </div>
  );
}