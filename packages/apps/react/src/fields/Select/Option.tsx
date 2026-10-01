import { ButtonHTMLAttributes, cloneElement, ReactElement, useMemo } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';
import type { Colors } from '@iziui/core/theme';

export type OptionValue = string | number;

export interface OptionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: OptionValue;
  children: string;
  color?: Colors;
  startIcon?: React.JSX.Element | boolean;
}
export default function Option({
  children,
  color,
  startIcon,
  disabled,
  value,
  ...props
}: OptionProps) {
  const className = joinClass(
    `${prefix}-select__option`,
    disabled && `${prefix}-select__option--disabled`,
    color && `${prefix}-select__option--${color}`,
    props.className
  );
  const optionAttributes = useMemo(() => ({
    role: props.role ?? 'option',
    ariaDisabled: disabled || props['aria-disabled'] || undefined,
  }), [disabled, props['aria-disabled'], props.role]);

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
      value={value}
      role={optionAttributes.role}
      aria-disabled={optionAttributes.ariaDisabled}
      disabled={disabled}
    >
      {startIcon && renderIcon(startIcon as React.JSX.Element)}
      {children}
    </button>
  );
};
