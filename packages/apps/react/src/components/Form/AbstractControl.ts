import FormControl from './FormControl';

export type AbstractControl<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
> = { [x in K]: FormControl<T[K]> }