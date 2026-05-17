import { useState } from 'react';

import FormGroup from './FormGroup';
import FormControl from './FormControl';
import type { Constructor } from './FormControl';
import type { Handle, Validator } from './FormGroup';
import type { AbstractControl } from './AbstractControl';

type UseForm<T extends Record<string, any>> = {
  form: { [K in keyof T]: Constructor<T[K]> };
  handle: Handle<T>;
  validator?: Validator<T>;
}

function makingControls<T extends Record<string, any>>(form: { [K in keyof T]: Constructor<T[K]> }) {
  return Object.entries(form)
    .reduce((acc, data) => {
      const key = data[0] as keyof T;
      const value = data[1] as Constructor<T[keyof T]>;

      acc[key] = new FormControl(value);

      return acc;
    }, {} as AbstractControl<T>);
}

export default function useForm<T extends Record<any, any>>({
  form,
  handle,
  validator
}: UseForm<T>) {
  const [formGroup, setFormGroup] = useState<FormGroup<T>>(
    new FormGroup(
      makingControls(form),
      handle,
      validator
    )
  );

  const hydrate = (form: FormGroup<T>) => {
    setFormGroup(prev => {
      const controls = form.controls;

      const newFormGroup = new FormGroup(controls, handle, validator);
      newFormGroup.hydrate = prev.hydrate;

      return newFormGroup;
    });
  };

  formGroup.hydrate = hydrate;

  return formGroup;
}