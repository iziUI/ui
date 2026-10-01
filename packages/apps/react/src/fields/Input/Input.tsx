import {
  cloneElement,
  type MouseEvent,
  type ReactElement,
  type CSSProperties,
  type InputHTMLAttributes,
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import type { ButtonIconProps } from '@/actions/ButtonIcon';
import createComponent from '@/core';

import '@iziui/styles/components/Input.scss';

import useFieldAccessibility from '../useFieldAccessibility';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  helperText?: string;
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
  id,
  ...props
}: InputProps) {
  const ariaDescribedBy = props['aria-describedby'];
  const ariaInvalid = props['aria-invalid'];
  const { controlId, helperTextId, describedBy, ariaInvalid: resolvedAriaInvalid } = useFieldAccessibility({
    id,
    helperText,
    error,
    ariaDescribedBy,
    ariaInvalid,
  });

  const containerClss = joinClass(
    `${prefix}-input-container`,
  );

  const labelClss = joinClass(
    `${prefix}-input-label`,
    error && `${prefix}-input-label--error`,
  );

  const classes = joinClass(
    `${prefix}-input`,
    disabled && `${prefix}-input--disabled`,
    error && `${prefix}-input--error`,
    props.className
  );

  const helperTextClss = joinClass(
    `${prefix}-input__helper-text`,
    error && `${prefix}-input__helper-text--error`
  );

  const renderIcon = (icon: ReactElement<ButtonIconProps>, direction: 'left' | 'right') => {
    return cloneElement(icon, {
      disabled,
      size: icon.props.size || 30,
      type: 'button',
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
      {label && <label className={labelClss} htmlFor={controlId}>
        {label} {props.required && '*'}
      </label>}
      <div className={classes}>
        {startIcon && renderIcon(startIcon as React.JSX.Element, 'right')}
        <input
          {...props}
          id={controlId}
          aria-describedby={describedBy}
          aria-invalid={resolvedAriaInvalid}
          type={type}
          disabled={disabled}
        />
        {endIcon && renderIcon(endIcon as React.JSX.Element, 'left')}
      </div>
      {
        helperText && (
          <p id={helperTextId} className={helperTextClss}>
            {helperText}
          </p>
        )
      }
    </div>
  );
}

export default createComponent(Input);
