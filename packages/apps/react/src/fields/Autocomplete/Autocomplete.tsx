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
import Menu, { type MenuProps } from '@/navigation/Menu/Menu';
import useMenu from '@/navigation/Menu/useMenu';

import '@iziui/styles/components/Autocomplete.scss';

import useFieldAccessibility from '../useFieldAccessibility';

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

  id,
  ...props
}: AutocompleteProps<T>) {
  const [open, el, toggle] = useMenu();

  const [term, setTerm] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const menuId = useMemo(() => uuid(), []);
  const ariaDescribedBy = props['aria-describedby'];
  const ariaInvalid = props['aria-invalid'];

  const { controlId, helperTextId, describedBy, ariaInvalid: resolvedAriaInvalid } = useFieldAccessibility({
    id,
    helperText,
    error,
    ariaDescribedBy,
    ariaInvalid,
  });

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
        `${prefix}-autocomplete__icon`,
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

  const enabledOptionIndexes = useMemo(() => {
    return visibleOptions.reduce<number[]>((indexes, option, index) => {
      if (!renderOption(option).props.disabled) {
        indexes.push(index);
      }

      return indexes;
    }, []);
  }, [visibleOptions, renderOption]);

  const activeDescendant = useMemo(() => {
    if (activeIndex < 0) { return; }

    return `${menuId}-option-${activeIndex}`;
  }, [activeIndex, menuId]);

  const getNextActiveIndex = (currentIndex: number, direction: 1 | -1) => {
    if (!enabledOptionIndexes.length) { return -1; }

    const currentEnabledIndex = enabledOptionIndexes.indexOf(currentIndex);

    if (currentEnabledIndex < 0) {
      return direction === 1 ? enabledOptionIndexes[0] : enabledOptionIndexes.at(-1)!;
    }

    const nextEnabledIndex = Math.min(
      Math.max(currentEnabledIndex + direction, 0),
      enabledOptionIndexes.length - 1
    );

    return enabledOptionIndexes[nextEnabledIndex];
  };

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
        id: `${menuId}-option-${index}`,
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
        setActiveIndex((prev) => getNextActiveIndex(prev, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => getNextActiveIndex(prev, -1));
        break;
      case 'Enter': {
        const target = visibleOptions[activeIndex];
        if (open && target && enabledOptionIndexes.includes(activeIndex)) {
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
      {label && <label className={labelClss} htmlFor={controlId}>{label} {props.required && '*'}</label>}
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
          id={controlId}
          value={term}
          type="text"
          role="combobox"
          aria-describedby={describedBy}
          aria-invalid={resolvedAriaInvalid}
          aria-expanded={open}
          aria-controls={menuId}
          aria-autocomplete="list"
          aria-activedescendant={activeDescendant}
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
        id={menuId}
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
      {
        helperTextClss && (
          <span id={helperTextId} className={helperTextClss}>{helperText}</span>
        )
      }
    </div>
  );
}

export default createComponent(Autocomplete) as <T>(
  props: Sx<AutocompleteProps<T>>
) => React.JSX.Element;
