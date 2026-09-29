import type { AbstractControl } from './AbstractControl';
import type FormControl from './FormControl';

type Hydrate<T extends object> = (data: FormGroup<T>) => void;
type SetValues<F> = Partial<F> | ((values: F) => Partial<F>);

export type Validator<T extends object> = Partial<{
  [K in keyof T]: (data: FormGroup<T>) => string | void;
}>

export interface Handle<T extends object> {
  change?: (form: FormGroup<T>) => void;
  submit?: (form: FormGroup<T>) => void;
}

export default class FormGroup<T extends object> {
  private _valid = false;
  private _hydrate!: Hydrate<T>;

  constructor(
    public controls: AbstractControl<T>,
    public handle: Handle<T>,
    public validator?: Validator<T>,
  ) { }

  /**
 * Atualiza o estado interno do componente.
 * @private
 * @description Este método é usado internamente pela biblioteca.
 *              Para atualizar valores externamente, use {@link setValues}.
*/
  get hydrate() { return this._hydrate; }
  set hydrate(fn: (values: FormGroup<T>) => void) { this._hydrate = fn; }

  get isValid(): boolean { return this._valid; }
  set isValid(validity: boolean) { this._valid = validity; }

  get errors() {
    const errors: Array<FormControl<T[keyof T]>> = [];

    this.eachControl((control) => {
      if (!control.error) { return; }

      errors.push(control);
    });

    return errors;
  }

  get values(): T {
    const values = {} as Partial<T>;

    this.eachControl((control, key) => {
      values[key] = control.value;
    });

    return values as T;
  }

  public setValues(fn: SetValues<T>): void;
  public setValues(partialForm: Partial<T>): void;
  public setValues(arg: Partial<T> | SetValues<T>) {
    const partial =
      typeof arg === 'function'
        ? arg(this.values)
        : arg;

    for (const key of Object.keys(partial) as Array<keyof T>) {
      this.controls[key].value = partial[key] as T[typeof key];
    }

    this.validate();

    if (!this.handle.change) { return; }

    this.handle.change(this);
  }

  private eachControl(fn: (control: FormControl<T[keyof T]>, key: keyof T) => void) {
    for (const key of Object.keys(this.controls) as Array<keyof T>) {
      fn(this.controls[key], key);
    }
  }

  public submit() {
    if (!this.handle.submit) { return; }

    this.eachControl((control) => { control.dirty = true; });

    this.validate();

    this.handle.submit(this);
  }

  public reset() {
    this.eachControl((control) => control.reset());
    this.hydrate(this);
  }

  public validate() {
    for (const key of Object.keys(this.controls) as Array<keyof T>) {
      const control = this.controls[key];
      let error = control.validate();

      if (this.validator && this.validator[key]) {
        error = this.validator[key](this) || '';
      }

      control.error = error;
    }

    this.isValid = !this.errors.length;
    this.hydrate(this);
  }
}
