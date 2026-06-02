import {
  useMemo,
  Children,
  cloneElement,
  type ReactElement,
  type InputHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';

import Icon from '@/display/Icon';
import { Menu, type MenuProps, useMenu } from '@/navigation/Menu';

import type { OptionProps } from './Option';
import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Select.scss';

export interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'color'> {
  error?: boolean;
  label?: string;
  helperText?: string;
  color?: Colors;
  position?: MenuProps['position'];
  startIcon?: React.JSX.Element | boolean;
  children: React.JSX.Element | React.JSX.Element[];
}

function Select({
  error,
  color = 'grey',
  position = 'bottom',
  label,
  helperText,
  startIcon,
  children,
  disabled,
  onChange,
  ...props
}: SelectProps) {
  const arrayChildren = Children.toArray(children) as ReactElement<OptionProps>[];

  const newValue = useMemo(() => {
    return arrayChildren.find((child) =>
      child.props.value === props.value)?.props.children || '';
  }, [props.value]);

  const [open, el, toggle] = useMenu();

  const containerClss = joinClass(
    `${prefix}-select-container`
  );

  const labelClss = joinClass(
    `${prefix}-select-label`,
    error && `${prefix}-select-label--error`,
  );

  const clss = joinClass(
    `${prefix}-select`,
    disabled && `${prefix}-select--disabled`,
    error && `${prefix}-select--error`,
    props.className
  );

  const helperTextClss = joinClass(
    `${prefix}-select__helper-text`,
    helperText && `${prefix}-select__helper-text--visible`,
    error && `${prefix}-select__helper-text--error`
  );

  const renderIcon = (icon: ReactElement<ButtonHTMLAttributes<any>>) => {
    return cloneElement(icon, {
      className: joinClass(
        icon.props.className,
        `${prefix}-select__icon--left`
      ),
      type: 'button',
      style: { color },
      onClick: (e) => {
        e.stopPropagation();
        if (icon.props.onClick && !disabled) { icon.props.onClick(e); };
      }
    });
  };

  const renderOption = () => {
    return arrayChildren.map((child) => {
      return cloneElement(child, {
        color,
        className: joinClass(
          child.props.className,
          child.props.value === props.value && `${prefix}-select__option--selected`,
        ),
        onClick: (e) => {
          if (!child.props.disabled && onChange) { onChange(e as any); }
        }
      });
    });
  };

  return (
    <div className={containerClss}>
      {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
      <button type="button" className={clss} onClick={toggle} disabled={disabled}>
        <div>
          {startIcon && renderIcon(startIcon as React.JSX.Element)}
        </div>
        <input {...props} readOnly type="text" value={newValue} disabled={disabled} />
        <Icon
          name="angle-down"
          sx={{ color: ({ grey }) => grey.main }}
          className={`${prefix}-select__icon--right`}
        />
      </button>
      <Menu
        autoClose
        position={position}
        direction="center"
        open={open}
        anchorEl={el}
        onClose={toggle}
      >
        {renderOption()}
      </Menu>
      <span className={helperTextClss}>{helperText}</span>
    </div>
  );
}

export default createComponent(Select);
