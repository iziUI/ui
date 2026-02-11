import type { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import Ripple from '../Ripple';
import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Card.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> { onClick?: (e?: any) => void; }

function Card({ children, onClick, ...props }: CardProps) {
  const cls = joinClass(`${prefix}-card`, onClick && `${prefix}-card--clickable`, props.className);

  return (
    <div {...props} className={cls} onMouseDown={onClick}>
      {children}
      {onClick && <Ripple />}
    </div>
  );
}

export default createComponent(Card);