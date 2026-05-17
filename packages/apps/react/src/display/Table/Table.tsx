import type { TableHTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '@/core/createComponent';

import { Card } from '../Card';

import '@iziui/styles/components/Table.scss';

export type TableProps = TableHTMLAttributes<HTMLTableElement>;

function Table({ children, ...props }: TableProps) {
  const cls = joinClass(
    `${prefix}-table`,
    props.className
  );

  return (
    <Card fullWidth style={{ overflow: 'auto' }}>
      <table className={cls} {...props}>
        {children}
      </table>
    </Card>
  );
}

export default createComponent(Table);
