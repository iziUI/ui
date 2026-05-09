import { TdHTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '../../core/createComponent';

interface TableCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
  align?: 'left' | 'center' | 'right';
  children: React.JSX.Element | string | number | null;
}
function TableCell({ align = 'left', children, ...props }: TableCellProps) {
  const className = joinClass(
    `${prefix}-table__cell`,
    `${prefix}-table__cell--${align}`,
  );

  return (
    <td className={className} {...props}>
      {children}
    </td>
  );
}

export default createComponent(TableCell);