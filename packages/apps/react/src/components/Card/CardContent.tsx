import { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '../../core/createComponent';

type CardContentProps = HTMLAttributes<HTMLDivElement>;
function CardContent({ children, ...props }: CardContentProps) {

  const cls = joinClass(`${prefix}-card__content`, props.className);

  return (
    <div {...props} className={cls}>
      {children}
    </div>
  );
}

export default createComponent(CardContent);