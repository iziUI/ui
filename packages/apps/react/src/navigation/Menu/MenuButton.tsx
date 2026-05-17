import { type ButtonHTMLAttributes, cloneElement } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';
import type { Colors } from '@iziui/core/theme';

import type { IconProps } from '@/display/Icon';
import Ripple from '@/actions/Ripple';

import createComponent from '../../core/createComponent';

export interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: Colors;
  icon?: React.JSX.Element;
}

function MenuButton({ label, icon, color = 'grey', ...props }: MenuButtonProps) {
  const className = joinClass(
    `${prefix}-menu__item`,
    color && `${prefix}-menu__item--${color}`,
    props.className
  );

  const renderIcon = () => {
    return icon && cloneElement<IconProps>(icon, {
      size: 18,
      style: { marginRight: 8 }
    });
  };

  return (
    <button {...props} className={className}>
      {renderIcon()}
      {label}
      <Ripple />
    </button>
  );
}

export default createComponent(MenuButton);