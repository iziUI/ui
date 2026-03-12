import { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '@/core/createComponent';

import '@iziui/styles/components/Divider.scss';

export type DividerProps = HTMLAttributes<HTMLElement>;
function Divider({ ...props }: DividerProps) {

  const clss = joinClass(
    `${prefix}-divider`,
    props.className
  );

  return (
    <div {...props} className={clss} />
  );
}

export default createComponent(Divider);