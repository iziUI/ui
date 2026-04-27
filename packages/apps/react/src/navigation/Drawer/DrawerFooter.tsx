import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '../../core/createComponent';

type DrawerFooterProps = PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>

function DrawerFooter({ children, ...props }: DrawerFooterProps) {
  const cls = joinClass(
    `${prefix}-drawer__footer`,
    props.className
  );

  return (
    <div {...props} className={cls}>
      {children}
    </div>
  );
}

export default createComponent(DrawerFooter);
