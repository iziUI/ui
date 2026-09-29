import { ChangeEvent, cloneElement, InputEvent, InputHTMLAttributes, ReactElement } from 'react';

import useControl from './useControl';
import type { AbstractControl } from './AbstractControl';

export type ControlProps<
  T extends object,
  K extends keyof T
> = {
  [I in K]: {
    controlName: I;
    action?: 'change' | 'input' | 'blur';
    field: (control: AbstractControl<T>[I]) => React.JSX.Element;
  }
}[K];

export function createControl<T extends object>() {
  return function Control<K extends keyof T>({
    controlName,
    field,
    action = 'input'
  }: ControlProps<T, K>) {
    const { control, update } = useControl<T, K>(controlName);

    const renderChildren = (child: ReactElement<InputHTMLAttributes<HTMLInputElement>>) => {
      const getValue = (e: ChangeEvent<HTMLInputElement> | InputEvent<HTMLInputElement>) => {
        const target = (e.currentTarget || e.target) as HTMLInputElement;
        const type = target.type || e.type;

        if (['radio', 'checkbox'].includes(type)) { return target.checked as T[K]; }

        return target.value as T[K];
      };

      return cloneElement(child, {
        onBlur: (e) => {
          if (action === 'blur') { update(getValue(e)); };

          if (child.props.onBlur) { child.props.onBlur(e); }
        },
        onInput: (e) => {
          if (action === 'input') { update(getValue(e)); };

          if (child.props.onInput) { child.props.onInput(e); }
        },
        onChange: (e) => {
          if (action === 'change') { update(getValue(e)); };

          if (child.props.onChange) { child.props.onChange(e); }
        },
      });
    };

    return (
      renderChildren(field(control))
    );
  };
}