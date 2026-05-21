import { InputHTMLAttributes, useEffect, useMemo, useState } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';

import { uuid } from '@iziui/toolkit/uuid';

import Stack from '@/layout/Stack';

import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Switch.scss';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  color?: Colors;
  auto?: boolean;
}

function Switch({ label, error, helperText, color = 'primary', ...props }: SwitchProps) {
  const [checked, setChecked] = useState(Boolean(props.checked));

  const classNameCheckbox = joinClass(
    `${prefix}-switch__checkbox`,
    `${prefix}-switch__checkbox--${color}`,
  );

  const classNameLabel = joinClass(
    `${prefix}-switch__label`,
    error && `${prefix}-switch__label--error`,
  );

  const helperTextClss = joinClass(
    `${prefix}-switch__helper-text`,
    error && `${prefix}-switch__helper-text--error`,
    helperText && `${prefix}-switch__helper-text--visible`,
  );

  const id = useMemo(() => `${prefix}-switch-${uuid()}`, []);

  useEffect(() => { setChecked(Boolean(props.checked)); }, [props.checked]);

  const handleToggle = () => {
    if (!props.onChange) { return; }

    props.onChange({
      type: 'checkbox',
      target: { checked: !checked }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Stack gap={2} style={{ width: 'fit-content' }}>
      <label htmlFor={id} className={classNameLabel}>
        {label}
      </label>
      <div className={`${prefix}-switch`}>
        <input
          {...props}
          type="checkbox"
          id={id}
          className={classNameCheckbox}
          onChange={handleToggle}
          checked={checked}
        />
        <label className={`${prefix}-switch__box`} htmlFor={id}>
          <span className={`${prefix}-switch__button`} />
        </label>
      </div>
      <span className={helperTextClss}>{helperText}</span>
    </Stack>
  );
}

export default createComponent(Switch);