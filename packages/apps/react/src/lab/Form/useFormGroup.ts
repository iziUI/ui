import { useContext } from 'react';

import type FormGroup from './FormGroup';
import { FormContext } from './Form';
import type { FormValues } from './AbstractControl';

export default function useFormGroup<T extends object = FormValues>() {
  const context = useContext(FormContext);

  if (!context) throw new Error('useFormGroup must be used inside <FormProvider> (or <Form />).');

  return context as unknown as FormGroup<T>;
}
