import {
  cloneElement,
  type MouseEvent,
  type ReactElement,
  type CSSProperties,
  type TextareaHTMLAttributes,
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '@/core';
import type { ButtonIconProps } from '@/actions/ButtonIcon';

import '@iziui/styles/components/Textarea.scss';

import useFieldAccessibility from '../useFieldAccessibility';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  label?: string;
  helperText?: string;
  width?: CSSProperties['width'];
  endIcon?: React.JSX.Element | boolean;
  startIcon?: React.JSX.Element | boolean;
}

function Textarea({
  error,
  label,
  helperText,
  endIcon,
  startIcon,
  disabled,
  width = '100%',
  id,
  ...props
}: TextareaProps) {
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
    `${prefix}-textarea-container`,
  );

  const labelClss = joinClass(
    `${prefix}-textarea-label`,
    error && `${prefix}-textarea-label--error`,
  );

  const classes = joinClass(
    `${prefix}-textarea`,
    disabled && `${prefix}-textarea--disabled`,
    error && `${prefix}-textarea--error`,
    props.className
  );

  const helperTextClss = joinClass(
    `${prefix}-textarea__helper-text`,
    helperText && `${prefix}-textarea__helper-text--visible`,
    error && `${prefix}-textarea__helper-text--error`
  );

  const renderIcon = (icon: ReactElement<ButtonIconProps>, direction: 'left' | 'right') => {
    return cloneElement(icon, {
      disabled,
      size: icon.props.size || 30,
      type: 'button',
      style: {
        ...(disabled ? { background: 'transparent' } : {}),
        ...icon.props.style,
      },
      className: joinClass(
        icon.props.className,
        `${prefix}-textarea__icon`,
        `${prefix}-textarea__icon--margin-${direction}`
      ),
      onClick: (e: MouseEvent<any, globalThis.MouseEvent>) => {
        e.stopPropagation();
        if (icon.props.onClick) { icon.props.onClick(e); };
      }
    });
  };

  return (
    <div className={containerClss} style={{ width }}>
      {label && <label className={labelClss} htmlFor={controlId}>{label} {props.required && '*'}</label>}
      <div className={classes}>
        {startIcon && renderIcon(startIcon as React.JSX.Element, 'right')}
        <textarea
          {...props}
          id={controlId}
          aria-describedby={describedBy}
          aria-invalid={resolvedAriaInvalid}
          disabled={disabled}
        />
        {endIcon && renderIcon(endIcon as React.JSX.Element, 'left')}
      </div>
      {helperText && <p id={helperTextId} className={helperTextClss}>{helperText}</p>}
    </div>
  );
}

export default createComponent(Textarea);
