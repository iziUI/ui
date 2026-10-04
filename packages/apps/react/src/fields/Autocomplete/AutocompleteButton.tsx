import { ButtonHTMLAttributes, cloneElement, ReactElement, useMemo } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';
import type { Colors } from '@iziui/core/theme';

export type AutocompleteButtonValue = string | number | Record<string, unknown>;

export interface AutocompleteButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  children: string;
  color?: Colors;
  value: AutocompleteButtonValue;
  startIcon?: React.JSX.Element | boolean;
}
export default function Option({
  children,
  color,
  startIcon,
  disabled,
  ...props
}: AutocompleteButtonProps) {
  // eslint-disable-next-line
  const { value, ...rest } = props;

  const className = joinClass(
    `${prefix}-autocomplete__button`,
    disabled && `${prefix}-autocomplete__button--disabled`,
    color && `${prefix}-autocomplete__button--${color}`,
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
        `${prefix}-autocomplete__button__icon`,
      ),
    });
  };

  return (
    <button
      type="button"
      {...rest}
      className={className}
      role={optionAttributes.role}
      aria-disabled={optionAttributes.ariaDisabled}
      disabled={disabled}
    >
      {startIcon && renderIcon(startIcon as React.JSX.Element)}
      {children}
    </button>
  );
};
