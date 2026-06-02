import {
  useRef,
  useMemo,
  useState,
  useEffect,
  cloneElement,
  useLayoutEffect,
  type FocusEvent,
  type MouseEvent,
  type ReactElement,
  type KeyboardEvent,
  type InputHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Sx } from '@iziui/core/system';
import { joinClass } from '@iziui/core/utils/joinClass';

import { uuid } from '@iziui/toolkit/uuid';

import createComponent from '@/core';
import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';
import Loading from '@/feedback/Loading';
import ButtonIcon from '@/actions/ButtonIcon';
import Typography from '@/display/Typography';
import { Menu, useMenu, type MenuProps } from '@/navigation/Menu';

import '@iziui/styles/components/Autocomplete.scss';

export interface AutocompleteProps<T>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  error?: boolean;
  loading?: boolean;
  helperText?: string;
  value?: T;
  options: T[];
  position?: MenuProps['position'];
  startIcon?: React.JSX.Element | boolean;

  debounceTime?: number;

  onOpen?: () => void;
  onChange: (data?: T) => void;
  onSearch?: (term: string) => void;

  renderOption: (option: T) => React.JSX.Element;
  filterOptions?: (option: T, value?: string) => boolean;

  emptyContent?: React.JSX.Element;
}

function Autocomplete<T>({
  label,
  error,
  position,
  disabled,
  startIcon,
  helperText,

  value,
  options = [],
  loading,

  debounceTime = 300,

  onOpen,
  onChange,
  onSearch,

  renderOption,
  filterOptions,

  emptyContent = (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      No data
    </Typography>
  ),

  ...props
}: AutocompleteProps<T>) {
  const [open, el, toggle] = useMenu();

  const [term, setTerm] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const id = useMemo(() => uuid(), []);

  const cls = joinClass(
    `${prefix}-autocomplete`,
    disabled && `${prefix}-autocomplete--disabled`,
    error && `${prefix}-autocomplete--error`,
    props.className
  );

  const containerClss = joinClass(
    `${prefix}-autocomplete-container`
  );

  const labelClss = joinClass(
    `${prefix}-autocomplete-label`,
    error && `${prefix}-autocomplete-label--error`,
  );

  const helperTextClss = joinClass(
    `${prefix}-autocomplete__helper-text`,
    helperText && `${prefix}-autocomplete__helper-text--visible`,
    error && `${prefix}-autocomplete__helper-text--error`
  );

  useLayoutEffect(() => {
    if (value === undefined || value === null) {
      setTerm('');
      return;
    }

    const child = renderOption(value);
    setTerm(child.props.children);
  }, [value]);

  useEffect(() => {
    if (open) { return; }
    setActiveIndex(-1);
  }, [open]);

  const renderIcon = (icon: ReactElement<ButtonHTMLAttributes<any>>) => {
    return cloneElement(icon, {
      className: joinClass(
        icon.props.className,
        `${prefix}-autocomplete__icon--left`
      ),
      type: 'button',
      onClick: (e) => {
        e.stopPropagation();
        if (icon.props.onClick && !disabled) { icon.props.onClick(e); };
      }
    });
  };

  const visibleOptions = useMemo(() => {
    if (onSearch || !filterOptions) { return options; }

    return options.filter((option) => filterOptions(option, term));
  }, [options, term, onSearch, filterOptions]);

  const closeMenu = () => {
    if (!open) { return; }
    toggle();
  };

  const selectOption = (option: T) => {
    onChange(option);
    setTerm(renderOption(option).props.children);
  };

  const _renderOptions = () => {
    return visibleOptions.map((o, index) => {
      const child = renderOption(o);
      const selected = o === value;
      const active = index === activeIndex;
      return cloneElement(child, {
        id: `${id}-option-${index}`,
        role: 'option',
        'aria-selected': selected,
        className: joinClass(
          child.props.className,
          (selected || active) && `${prefix}-select__option--selected`,
        ),
        onMouseEnter: () => setActiveIndex(index),
        onClick: () => selectOption(o),
      });
    });
  };

  const handleInput = (value: string) => {
    setTerm(value);
    setActiveIndex(-1);

    if (!onSearch) { return; }

    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => { onSearch(value); }, debounceTime);
  };

  const handleOpen = (
    e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => {
    if (disabled || open) { return; }
    if (onOpen) { onOpen(); }

    toggle(e as any);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) { return; }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) { handleOpen(e); return; }
        setActiveIndex((prev) => Math.min(prev + 1, visibleOptions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter': {
        const target = visibleOptions[activeIndex];
        if (open && target) {
          e.preventDefault();
          selectOption(target);
          closeMenu();
        }
        break;
      }
      case 'Escape':
        closeMenu();
        break;
    }
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    clearTimeout(searchTimer.current);
    onChange();
    setTerm('');
  };

  return (
    <div className={containerClss}>
      {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
      <div
        className={cls}
        onClick={handleOpen}
        onFocus={handleOpen}
      >
        <div>
          {startIcon && renderIcon(startIcon as React.JSX.Element)}
        </div>
        <input
          {...props}
          value={term}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={id}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
          onInput={(e: any) => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        {
          term && (
            <ButtonIcon
              color="grey"
              size={32}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleReset}
              className={`${prefix}-autocomplete__reset-button`}
            >
              <Icon name="times" />
            </ButtonIcon>
          )
        }
      </div>
      <Menu
        id={id}
        role="listbox"
        autoClose
        position={position}
        direction="center"
        open={open}
        anchorEl={el}
        onClose={toggle}
      >
        {
          loading && (
            <Stack justifyContent="center" alignItems="center">
              <Loading />
            </Stack>
          )
        }
        {!loading && _renderOptions()}
        {!loading && !visibleOptions.length && emptyContent}
      </Menu>
      <span className={helperTextClss}>{helperText}</span>
    </div>
  );
}

export default createComponent(Autocomplete) as <T>(
  props: Sx<AutocompleteProps<T>>
) => React.JSX.Element;
