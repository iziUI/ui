import type FormControl from './FormControl';

export type AbstractControl<
  T extends Record<string, any>,
  K extends keyof T = keyof T
> = { [x in K]: FormControl<T[K]> }