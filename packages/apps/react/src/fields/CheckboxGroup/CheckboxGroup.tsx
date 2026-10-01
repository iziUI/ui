import { ChangeEvent, Children, cloneElement, ReactElement, useCallback, useEffect, useState } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';
import type { Sx } from '@iziui/core/system';

import Stack from '@/layout/Stack';

import createComponent from '../../core/createComponent';
import type { CheckboxProps } from '../Checkbox';
import useFieldAccessibility from '../useFieldAccessibility';

import '@iziui/styles/components/CheckboxGroup.scss';

export interface CheckboxGroupItem<T = CheckboxProps['value']> {
  id: string;
  value: T;
  checked: boolean;
}

let ID_REFERENCE = 0;

export interface CheckboxGroupProps<T = CheckboxProps['value']> {
  id?: string;
  className?: string;
  children: React.ReactNode;
  label?: string;
  helperText?: string;
  error?: boolean;
  values?: string[];
  onChange?: (data: CheckboxGroupItem<T>[]) => void;
}

function CheckboxGroup<T = CheckboxProps['value']>({
  id,
  children,
  values,
  onChange,
  className,
  label,
  helperText,
  error,
}: CheckboxGroupProps<T>) {
  const reference = ++ID_REFERENCE;
  const arrayChildren = Children.toArray(children) as ReactElement<CheckboxProps>[];
  const { controlId, helperTextId, describedBy, ariaInvalid } = useFieldAccessibility({
    id,
    helperText,
    error,
  });

  const cls = joinClass(
    `${prefix}-checkbox-group`,
    className,
  );

  const [checkboxes, setCheckboxes] = useState<CheckboxGroupItem<T>[]>(arrayChildren.map((item) => ({
    id: item.props.name,
    value: item.props.value as T,
    checked: values ? values.some((val) => val === item.props.name) : false,
  })));

  const renderBoxes = useCallback(() => {
    return arrayChildren.map((child, index) => {
      const id = child.props.name;

      return cloneElement(child, {
        key: index,
        name: `${child.props.name}-${reference}`,
        checked: child.props.checked || checkboxes[index].checked,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          const newArray = checkboxes.map((item) => {
            if (item.id === id) { return { ...item, checked: e.target.checked }; }

            return item;
          });

          if (onChange) { onChange(newArray); }

          setCheckboxes(newArray);
        },
      });
    });
  }, [values, checkboxes]);

  useEffect(() => {
    setCheckboxes(arrayChildren.map((item) => ({
      id: item.props.name,
      value: item.props.value as T,
      checked: values ? values.some((val) => val === item.props.name) : false,
    })));
  }, [values]);

  return (
    <fieldset
      id={controlId}
      aria-describedby={describedBy}
      aria-invalid={ariaInvalid}
      style={{ border: 0, margin: 0, minWidth: 0, padding: 0 }}
    >
      {label && <legend>{label}</legend>}
      <Stack gap={2} className={cls}>
        {renderBoxes()}
      </Stack>
      {helperText && <span id={helperTextId}>{helperText}</span>}
    </fieldset>
  );
}

type CheckboxGroupComponent = <T = CheckboxProps['value']>(props: Sx<CheckboxGroupProps<T>>) => React.JSX.Element;

export default createComponent(CheckboxGroup) as CheckboxGroupComponent;
