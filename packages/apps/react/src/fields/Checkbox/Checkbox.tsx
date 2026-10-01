import type { HTMLProps } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';

import Stack from '@/layout/Stack';

import createComponent from '../../core/createComponent';
import useFieldAccessibility from '../useFieldAccessibility';

import '@iziui/styles/components/Checkbox.scss';

export interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'id'> {
  id?: string;
  name: string;
  label: string;
  helperText?: string;
  error?: boolean;
  color?: Colors;
  checked?: boolean;
}

function Checkbox({
  label,
  name,
  color = 'primary',
  checked,
  disabled,
  error,
  helperText,
  id,
  ...props
}: CheckboxProps) {
  const ariaDescribedBy = props['aria-describedby'];
  const ariaInvalid = props['aria-invalid'];
  const { controlId, helperTextId, describedBy, ariaInvalid: resolvedAriaInvalid } = useFieldAccessibility({
    id: id ?? name,
    helperText,
    error,
    ariaDescribedBy,
    ariaInvalid,
  });

  const className = joinClass(
    `${prefix}-checkbox`,
    `${prefix}-checkbox--${color}`,
    checked && `${prefix}-checkbox--${color}--checked`,
    disabled && `${prefix}-checkbox--disabled`,
  );

  const helperTextClss = joinClass(
    `${prefix}-checkbox__helper-text`,
    helperText && `${prefix}-checkbox__helper-text--visible`,
    error && `${prefix}-checkbox__helper-text--error`,
  );

  return (
    <Stack gap={4}>
      <label htmlFor={controlId} className={className}>
        <input
          type="checkbox"
          {...props}
          id={controlId}
          aria-describedby={describedBy}
          aria-invalid={resolvedAriaInvalid}
          name={name}
          checked={checked}
          disabled={disabled}
        />
        {label}
      </label>
      {
        <span id={helperTextId} className={helperTextClss}>{helperText}</span>
      }
    </Stack>
  );
}

export default createComponent(Checkbox);
