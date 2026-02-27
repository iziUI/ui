import { ChangeEvent, cloneElement, InputEvent, InputHTMLAttributes, ReactElement, useContext } from 'react';

import useControl from './useControl';
import useFormGroup from './useFormGroup';
import type { AbstractControl } from './AbstractControl';

interface ControlProps<
  T extends Record<string, unknown>,
  K extends keyof T,
> {
  controlName: K;
  action?: 'change' | 'input' | 'blur';
  field: (control: AbstractControl<T>[K]) => React.JSX.Element;
}

export default function Control<
  T extends Record<string, unknown>,
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
      required: control.required,
      onBlur: (e) => {
        const value = getValue(e);

        if (action === 'blur') { update(value); };

        if (child.props.onBlur) { child.props.onBlur(e); }
      },
      onInput: (e) => {
        const value = getValue(e);
        update(value);

        if (action === 'input') { control.dirty = true; };

        if (child.props.onInput) { child.props.onInput(e); }
      },
      onChange: (e) => {
        update(getValue(e));

        if (action === 'change') { control.dirty = true; };

        if (child.props.onChange) { child.props.onChange(e); }
      },
    });
  };

  return (
    renderChildren(field(control))
  );
}