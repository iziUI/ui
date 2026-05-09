import type { TableHTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

function TableBody({ children, ...props }: TableBodyProps) {

  const cls = joinClass(
    `${prefix}-table__body`,
    props.className
  );

  return (
    <tbody className={cls} {...props}>
      {children}
    </tbody>
  );
}

TableBody.displayName = 'TableBody';

export default TableBody;