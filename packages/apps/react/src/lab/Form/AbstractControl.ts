import type FormControl from './FormControl';

export type FormValue = string | number | boolean | readonly string[] | undefined;
export type FormValues = Record<string, FormValue>;

export type AbstractControl<
  T extends object,
  K extends keyof T = keyof T
> = {
    [P in K]: FormControl<T[P]>;
  };
