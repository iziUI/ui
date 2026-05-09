import type { PropsWithChildren } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

function TableHeader({ children }: PropsWithChildren) {
  const className = joinClass(
    `${prefix}-table__header`,
  );

  return (
    <thead className={className}>
      <tr>
        {children}
      </tr>
    </thead>
  );
}

TableHeader.displayName = 'TableHeader';

export default TableHeader;