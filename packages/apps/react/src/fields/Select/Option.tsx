import { ButtonHTMLAttributes, cloneElement, ReactElement } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';

export interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: any;
  children: string;
  startIcon?: React.JSX.Element | boolean;
}
export default function Option({ children, startIcon, disabled, ...props }: OptionProps) {
  const className = joinClass(
    `${prefix}-select__option`,
    disabled && `${prefix}-select__option--disabled`,
    props.className
  );

  const renderIcon = (icon: ReactElement<ButtonHTMLAttributes<any>>) => {
    return cloneElement(icon, {
      type: 'button',
      className: joinClass(
        icon.props.className,
        `${prefix}-select__option__icon`,
      ),
    });
  };

  return (
    <button type="button" {...props} className={className}>
      {startIcon && renderIcon(startIcon as React.JSX.Element)}
      {children}
    </button>
  );
};