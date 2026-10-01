import {
  useMemo,
  useId,
  Children,
  cloneElement,
  type ReactElement,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type MouseEvent,
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';

import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';
import { Menu, type MenuProps, useMenu } from '@/navigation/Menu';

import type { OptionProps, OptionValue } from './Option';
import createComponent from '../../core/createComponent';
import useFieldAccessibility from '../useFieldAccessibility';

import '@iziui/styles/components/Select.scss';

export type SelectValue = OptionValue;
export type SelectChangeHandler = MouseEventHandler<HTMLButtonElement>;

export interface SelectProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'onChange' | 'type' | 'value'
> {
  error?: boolean;
  label?: string;
  helperText?: string;
  color?: Colors;
  position?: MenuProps['position'];
  startIcon?: React.JSX.Element | boolean;
  placeholder?: string;
  required?: boolean;
  value?: OptionValue;
  children: React.JSX.Element | React.JSX.Element[];
  onChange?: SelectChangeHandler;
  onValueChange?: (value: SelectValue) => void;
}

function Select({
  error,
  position = 'bottom',
  label,
  helperText,
  startIcon,
  children,
  disabled,
  onChange,
  onValueChange,
  id,
  name,
  value,
  placeholder,
  required,
  ...props
}: SelectProps) {
  const arrayChildren = useMemo(() => Children.toArray(children) as ReactElement<OptionProps>[], [children]);
  const menuId = useId();
  const ariaDescribedBy = props['aria-describedby'];
  const ariaInvalid = props['aria-invalid'];
  const { controlId, helperTextId, describedBy, ariaInvalid: resolvedAriaInvalid } = useFieldAccessibility({
    id,
    helperText,
    error,
    ariaDescribedBy,
    ariaInvalid,
  });

  const { displayValue, formValue } = useMemo(() => {
    const selectedOption = arrayChildren.find((child) => child.props.value === value);

    return {
      displayValue: selectedOption?.props.children || placeholder || '',
      formValue: value ?? '',
    };
  }, [arrayChildren, placeholder, value]);

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
    error && `${prefix}-select__helper-text--error`
  );

  const renderIcon = (icon: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>) => {
    return cloneElement(icon, {
      className: joinClass(
        icon.props.className,
        `${prefix}-select__icon--left`
      ),
      type: 'button',
      onClick: (e) => {
        e.stopPropagation();
        if (icon.props.onClick && !disabled) { icon.props.onClick(e); };
      }
    });
  };

  const handleOptionClick = (event: MouseEvent<HTMLButtonElement>, option: OptionProps) => {
    if (option.disabled) { return; }

    if (onChange) { onChange(event); }

    if (onValueChange) { onValueChange(option.value); }
  };

  const renderOption = () => {
    return arrayChildren.map((child, index) => {
      return cloneElement(child, {
        id: `${menuId}-option-${index}`,
        role: 'option',
        'aria-selected': child.props.value === value,
        'aria-disabled': child.props.disabled || undefined,
        className: joinClass(
          child.props.className,
          child.props.value === value && `${prefix}-select__option--selected`,
        ),
        onClick: (event) => handleOptionClick(event, child.props),
      });
    });
  };

  return (
    <div className={containerClss}>
      {label && <label className={labelClss} htmlFor={controlId}>{label} {required && '*'}</label>}
      <button
        {...props}
        id={controlId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-describedby={describedBy}
        aria-invalid={resolvedAriaInvalid}
        className={clss}
        onClick={toggle}
        disabled={disabled}
      >
        <Stack flexDirection="row" alignItems="center">
          <div>
            {startIcon && renderIcon(startIcon as React.JSX.Element)}
          </div>
          <span>{displayValue}</span>
        </Stack>
        <Icon
          name="angle-down"
          sx={{ color: ({ grey }) => grey.main }}
          className={`${prefix}-select__icon--right`}
        />
      </button>
      <input type="hidden" name={name} value={formValue} />
      <Menu
        id={menuId}
        role="listbox"
        autoClose
        position={position}
        direction="center"
        open={open}
        anchorEl={el}
        onClose={toggle}
      >
        {renderOption()}
      </Menu>
      {
        helperTextClss && (
          <span id={helperTextId} className={helperTextClss}>{helperText}</span>
        )
      }
    </div>
  );
}

export default createComponent(Select);
