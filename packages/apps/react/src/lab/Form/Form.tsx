import { createContext, SubmitEvent, HTMLAttributes } from 'react';

import type FormGroup from './FormGroup';

export const FormContext = createContext<FormGroup<any> | null>(null);

interface FormProps<T extends Record<string, any>> extends HTMLAttributes<HTMLFormElement> {
  formGroup: FormGroup<T>;
  debug?: boolean;
}

export default function Form<T extends Record<string, any>>({
  formGroup,
  debug = false,
  children,
  ...props
}: FormProps<T>) {
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    formGroup.submit();
  };

  return (
    <FormContext value={formGroup}>
      <form
        {...props}
        style={{ width: '100%', ...props.style }}
        onSubmit={submit}
        noValidate
      >
        {children}
      </form>
      {
        debug && (
          <pre style={{
            width: '100%',
            maxHeight: 350,
            padding: 15,
            borderRadius: 4,
            overflow: 'auto',
            color: '#333',
            background: '#e5e5e5',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          }}>
            {JSON.stringify(formGroup, null, 2)}
          </pre>
        )
      }
    </FormContext>
  );
}