import {
  useRef,
  useMemo,
  type InputHTMLAttributes,
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';
import { getContrastColor } from '@iziui/core/utils';

import { uuid } from '@iziui/toolkit/uuid';

import Box from '@/layout/Box';
import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';
import { useTheme } from '@/theme';
import { Menu, useMenu } from '@/navigation/Menu';

import COLORS from './colors';
import createComponent from '../../core/createComponent';

import '@iziui/styles/components/ColorPicker.scss';

export interface ColorPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label?: string;
  value: string;
  error?: boolean;
  helperText?: string;
  fitContent?: boolean;
  autoClose?: boolean;
}

function ColorPicker({
  label,
  error,
  helperText,
  fitContent,
  value = COLORS[0],
  autoClose,
  onChange,
  onInput,
  ...props
}: ColorPickerProps) {
  const { theme: { palette } } = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, el, toggle] = useMenu();

  const id = useMemo(() => uuid(), []);

  const labelClss = joinClass(
    `${prefix}-color-picker__label`,
    error && `${prefix}-color-picker__label--error`,
  );

  const containerClassName = joinClass(
    `${prefix}-color-picker-container`,
    error && `${prefix}-color-picker-container--error`,
  );

  const colorPickerClassName = joinClass(
    `${prefix}-color-picker`,
    error && `${prefix}-color-picker--error`,
  );

  const valueClassName = joinClass(
    `${prefix}-color-picker__value`,
    error && `${prefix}-color-picker__value--error`,
  );

  const helperTextClss = joinClass(
    `${prefix}-color-picker__helper-text`,
    helperText && `${prefix}-color-picker__helper-text--visible`,
    error && `${prefix}-color-picker__helper-text--error`,
  );

  const iconClassName = (c: string) => joinClass(
    `${prefix}-color-picker__color__icon`,
    value === c && `${prefix}-color-picker__color__icon--visible`,
  );

  function handleColorChange(color: string) {
    if (!inputRef.current) { return; }
    // if (autoClose) { toggle(); }

    inputRef.current.value = color;
    inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
  }

  return (
    <div className={containerClassName}>
      {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
      <button type="button" onClick={toggle} className={colorPickerClassName}>
        <div className={`${prefix}-color-picker__preview`}>
          <div style={{ backgroundColor: value }} />
        </div>
        <div className={valueClassName}>
          {value}
        </div>
      </button>
      <span className={helperTextClss}>{helperText}</span>
      <Menu
        direction="left"
        autoClose={autoClose}
        open={open}
        anchorEl={el}
        width={fitContent ? 'fit-content' : ''}
        onClose={toggle}
      >
        <Box sx={{ p: 1 }}>
          <Stack
            gap={8}
            flexDirection="row"
            justifyContent="center"
            style={{ flexWrap: 'wrap' }}
          >
            {
              COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${prefix}-color-picker__color`}
                  onClick={() => handleColorChange(c)}
                  style={{ backgroundColor: c }}
                >
                  <Icon
                    name="check"
                    className={iconClassName(c)}
                    style={{ color: getContrastColor(value) }}
                  />
                </button>
              ))
            }
            <label
              htmlFor={`color-picker-${id}`}
              className={`${prefix}-color-picker__color`}
              style={{ backgroundColor: palette.grey.main }}
            >
              <Icon
                name="plus"
                className={iconClassName(value)}
                style={{ color: getContrastColor(palette.grey.main) }}
              />
              <input
                ref={inputRef}
                type="color"
                id={`color-picker-${id}`}
                value={value}
                onChange={onChange}
                onInput={onInput}
              />
            </label>
          </Stack>
        </Box>
      </Menu>
    </div>
  );
}

export default createComponent(ColorPicker);
