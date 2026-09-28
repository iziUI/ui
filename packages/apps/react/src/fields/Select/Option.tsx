import { ButtonHTMLAttributes, cloneElement, ReactElement } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';
import type { Colors } from '@iziui/core/theme';

export interface OptionProps<T = string | number> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: T;
  children: string;
  color?: Colors;
  startIcon?: React.JSX.Element | boolean;
}
export default function Option<T = string | number>({
  children,
  color,
  startIcon,
  disabled,
  value,
  ...props
}: OptionProps<T>) {
  const className = joinClass(
    `${prefix}-select__option`,
    disabled && `${prefix}-select__option--disabled`,
    color && `${prefix}-select__option--${color}`,
    props.className
  );

  const renderIcon = (icon: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>) => {
    return cloneElement(icon, {
      type: 'button',
      className: joinClass(
        icon.props.className,
        `${prefix}-select__option__icon`,
      ),
    });
  };

  return (
    <button
      type="button"
      {...props}
      className={className}
      value={typeof value === 'string' || typeof value === 'number' ? value : undefined}
    >
      {startIcon && renderIcon(startIcon as React.JSX.Element)}
      {children}
    </button>
  );
};
