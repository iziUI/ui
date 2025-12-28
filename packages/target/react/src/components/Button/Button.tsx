import { type PropsWithChildren, type ButtonHTMLAttributes, cloneElement } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors, Size } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils';

import type { IconProps } from '../Icon';
import type { LoadingProps } from '../Loading';
import Ripple from '../../components/Ripple';
import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Button.scss';

export interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  size?: Size;
  color?: Colors;
  noHover?: boolean;
  fullWidth?: boolean;
  endIcon?: React.JSX.Element;
  startIcon?: React.JSX.Element;
  loading?: React.JSX.Element | boolean;
  variant?: 'contained' | 'outlined' | 'text';
};
function Button({
  size = 'medium',
  color = 'primary',
  variant = 'contained',
  fullWidth,
  startIcon,
  noHover = false,
  endIcon,
  loading,
  children,
  ...props
}: ButtonProps) {
  const cls = joinClass(
    `${prefix}-button`,
    `${prefix}-button--${size}`,
    `${prefix}-button--${color}`,
    `${prefix}-button--${color}--${variant}`,
    noHover && `${prefix}-button--noHover`,
    fullWidth && `${prefix}-button--fullWidth`,
    props.className
  );

  const renderIcon = (icon: React.JSX.Element, direction: 'left' | 'right') => {
    return cloneElement<IconProps>(icon, {
      color: `${color}.contrastText`,
      className: joinClass(icon.props.className, `${prefix}-button__icon`, `${prefix}-button__icon--${direction}`)
    });
  };

  const renderLoading = (loading: React.JSX.Element) => {
    return cloneElement<LoadingProps>(loading, {
      className: joinClass(loading.props.className, `${prefix}-button__loading`, `${prefix}-button__loading--${size}`),
      size: '1.1rem',
    });
  };

  return (
    <button
      {...props}
      className={cls}
      onClick={(e) => !loading && props.onClick?.(e)}
    >
      {
        loading ? renderLoading(loading as React.JSX.Element) : (
          <>
            {startIcon && renderIcon(startIcon, 'left')}
            {children}
            {endIcon && renderIcon(endIcon, 'right')}
          </>
        )
      }
      <Ripple />
    </button>
  );
}

export default createComponent(Button);