import {
  useMemo,
  useState,
  useEffect,
  type InputEvent,
  type ChangeEvent,
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
import { Menu, type MenuProps, useMenu } from '@/navigation/Menu';

import COLORS from './colors';
import createComponent from '../../core/createComponent';

import '@iziui/styles/components/ColorPicker.scss';

interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  fitContent?: boolean;
  MenuProps?: Partial<MenuProps>;
}

function ColorPicker({
  label,
  error,
  helperText,
  fitContent,
  value = COLORS[0],
  MenuProps,
  ...props
}: ColorPickerProps) {
  const { theme: { palette } } = useTheme();
  const [color, setColor] = useState<string>(value as string);

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

  useEffect(() => {
    if (props.onChange) {
      props.onChange({ target: { value: color } } as unknown as ChangeEvent<HTMLInputElement>);
    }
    if (props.onInput) {
      props.onInput({ target: { value: color } } as unknown as InputEvent<HTMLInputElement>);
    }
  }, [color]);

  useEffect(() => { setColor(value as string); }, [value]);

  const iconClassName = (c: string) => joinClass(
    `${prefix}-color-picker__color__icon`,
    color === c && `${prefix}-color-picker__color__icon--visible`,
  );

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  }

  return (
    <div className={containerClassName}>
      {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
      <button type="button" onClick={toggle} className={colorPickerClassName}>
        <div className={`${prefix}-color-picker__preview`}>
          <div style={{ backgroundColor: color }} />
        </div>
        <div className={valueClassName}>
          {color}
        </div>
      </button >
      <span className={helperTextClss}>{helperText}</span>
      <Menu
        direction="left"
        {...MenuProps}
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
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                >
                  <Icon
                    name="check"
                    className={iconClassName(c)}
                    style={{ color: getContrastColor(color) }}
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
                className={iconClassName(color)}
                style={{ color: getContrastColor(palette.grey.main) }}
              />
              <input
                type="color"
                id={`color-picker-${id}`}
                value={color}
                onChange={handleColorChange}
              />
            </label>
          </Stack>
        </Box>
      </Menu>
    </div>
  );
}

export default createComponent(ColorPicker);
