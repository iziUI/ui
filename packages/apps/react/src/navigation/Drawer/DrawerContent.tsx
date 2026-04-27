import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '../../core/createComponent';

type DrawerContentProps = PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>

function DrawerContent({ children, ...props }: DrawerContentProps) {
  const cls = joinClass(
    `${prefix}-drawer__content__container`,
    props.className
  );

  return (
    <div {...props} className={cls}>
      {children}
    </div>
  );
}

export default createComponent(DrawerContent);