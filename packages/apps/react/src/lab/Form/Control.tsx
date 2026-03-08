import { ChangeEvent, cloneElement, InputEvent, InputHTMLAttributes, ReactElement } from 'react';

import useControl from './useControl';
import type { AbstractControl } from './AbstractControl';

interface ControlProps<
  T extends Record<string, any>,
  K extends keyof T,
> {
  controlName: K;
  action?: 'change' | 'input' | 'blur';
  field: (control: AbstractControl<T>[K]) => React.JSX.Element;
}

export default function Control<
  T extends Record<string, any>,
  K extends keyof T
>({
  controlName,
  field,
  action = 'input'
}: ControlProps<T, K>) {
  const { control, update } = useControl<T, K>(controlName);

  const renderChildren = (child: ReactElement<InputHTMLAttributes<HTMLInputElement>>) => {
    const getValue = (e: ChangeEvent<HTMLInputElement> | InputEvent<HTMLInputElement>) => {
      if (['radio', 'checkbox'].includes(e.type)) { return e.target['checked']; }

      return e.target['value'];
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
}