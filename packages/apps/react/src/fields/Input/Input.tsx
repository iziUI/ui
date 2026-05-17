import { type InputHTMLAttributes, type ReactElement, type MouseEvent, cloneElement, CSSProperties } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import type { ButtonIconProps } from '@/actions/ButtonIcon';
import createComponent from '@/core';

import '@iziui/styles/components/Input.scss';

export type InputType = 'text' | 'password' | 'number' | 'date' | 'month' | 'tel';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  label?: string;
  helperText?: string;
  type?: InputType;
  width?: CSSProperties['width'];
  endIcon?: React.JSX.Element | boolean;
  startIcon?: React.JSX.Element | boolean;
}

function Input({
  error,
  label,
  helperText,
  endIcon,
  startIcon,
  type = 'text',
  disabled,
  width = '100%',
  ...props
}: InputProps) {
  const containerClss = joinClass(
    `${prefix}-input-container`,
  );

  const labelClss = joinClass(
    `${prefix}-input-label`,
    error && `${prefix}-input-label--error`,
  );

  const classes = joinClass(
    `${prefix}-input-container`,
    `${prefix}-input`,
    disabled && `${prefix}-input--disabled`,
    error && `${prefix}-input--error`,
    props.className
  );

  const helperTextClss = joinClass(
    `${prefix}-input__helper-text`,
    helperText && `${prefix}-input__helper-text--visible`,
    error && `${prefix}-input__helper-text--error`
  );

  const renderIcon = (icon: ReactElement<ButtonIconProps>, direction: 'left' | 'right') => {
    return cloneElement(icon, {
      disabled,
      size: icon.props.size || 30,
      type: 'button',
      color: 'grey',
      style: {
        ...icon.props.style,
      },
      className: joinClass(
        icon.props.className,
        `${prefix}-input__icon`,
        `${prefix}-input__icon--margin-${direction}`
      ),
      onClick: (e: MouseEvent<any, globalThis.MouseEvent>) => {
        e.stopPropagation();
        if (icon.props.onClick) { icon.props.onClick(e); };
      }
    });
  };

  return (
    <div className={containerClss} style={{ width }}>
      {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
      <div className={classes}>
        {startIcon && renderIcon(startIcon as React.JSX.Element, 'right')}
        <input {...props} type={type} disabled={disabled} />
        {endIcon && renderIcon(endIcon as React.JSX.Element, 'left')}
      </div>
      <p className={helperTextClss}>{helperText}</p>
    </div>
  );
}

export default createComponent(Input);