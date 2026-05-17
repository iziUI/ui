import { useContext } from 'react';

import type FormGroup from './FormGroup';
import { FormContext } from './Form';

export default function useFormGroup<T extends Record<string, any>>() {
  const context = useContext(FormContext);

  if (!context) throw new Error('useFormGroup must be used inside <FormProvider> (or <Form />).');

  return context as FormGroup<T>;
}