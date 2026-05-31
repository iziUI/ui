import { cloneElement, HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { Colors } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils';

import type { IconProps } from '@/display/Icon';

export interface TabButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  disabled?: boolean;
  color?: Colors;
  icon?: React.JSX.Element;
}

export default function TabButton({ icon, label, disabled, color = 'primary', ...props }: TabButtonProps) {
  const { 'aria-checked': checked } = props;

  const className = joinClass(
    `${prefix}-tabs__button`,
    disabled && `${prefix}-tabs__button--disabled`,
    checked && `${prefix}-tabs__button--active-${color}`,
    props.className
  );

  const renderIcon = () => {
    return icon && cloneElement<IconProps>(icon, {
      className: joinClass(
        `${prefix}-tabs__button__icon`,
      ),
    });
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      {...props}
    >
      {renderIcon()}
      {label}
    </button>
  );
}