import { ChangeEvent, Children, cloneElement, ReactElement, useCallback, useEffect, useState } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import Stack from '@/layout/Stack';

import createComponent from '../../core/createComponent';
import type { CheckboxProps } from '../Checkbox';

import '@iziui/styles/components/CheckboxGroup.scss';

type CheckboxData = { id: string; value: any; checked: boolean };

let ID_REFERENCE = 0;

export interface CheckboxGroupProps {
  className?: string;
  children: React.ReactNode;
  values?: string[];
  onChange?: (data: CheckboxData[]) => void;
}

function CheckboxGroup({ children, values, onChange, className }: CheckboxGroupProps) {
  const reference = ++ID_REFERENCE;
  const arrayChildren = Children.toArray(children) as ReactElement<CheckboxProps>[];

  const cls = joinClass(
    `${prefix}-checkbox-group`,
    className,
  );

  const [checkboxes, setCheckboxes] = useState<CheckboxData[]>(arrayChildren.map((item) => ({
    id: item.props.name,
    value: item.props.value,
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
      value: item.props.value,
      checked: values ? values.some((val) => val === item.props.name) : false,
    })));
  }, [values]);

  return (
    <Stack gap={2} className={cls}>
      {renderBoxes()}
    </Stack>
  );
}

export default createComponent(CheckboxGroup);
