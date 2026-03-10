import type { AbstractControl } from './AbstractControl';
import type FormControl from './FormControl';

type Hydrate<T extends Record<string, unknown>> = (data: FormGroup<T>) => void;
type SetValues<F> = Partial<F> | ((values: F) => Partial<F>);

export type Validator<T extends Record<string, unknown>> = {
  [K in keyof T]: (data: FormGroup<T>) => string | void;
}

export interface Handle<T extends Record<string, unknown>> {
  change?: (form: FormGroup<T>) => void;
  submit?: (form: FormGroup<T>) => void;
}

export default class FormGroup<T extends Record<string, unknown>> {
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
  set hydrate(fn: (values: FormGroup<T>) => any) { this._hydrate = fn; }

  get isValid(): boolean { return this._valid; }
  set isValid(validity: boolean) { this._valid = validity; }

  get errors() {
    return Object.values<FormControl<T[keyof T]>>(this.controls).filter(c => c.error);
  }

  get values(): T {
    const values: Record<string, any> = {};

    this.eachControl((control, key) => ({ [key as string]: control.value }))
      .forEach(control => { for (const prop in control) { values[prop] = control[prop]; } });

    return values as T;
  }

  public setValues(fn: SetValues<T>): void;
  public setValues(partialForm: Partial<T>): void;
  public setValues(arg: Partial<T> | SetValues<T>) {
    const partial =
      typeof arg === 'function'
        ? arg(this.values)
        : arg;

    for (const key of Object.keys(partial)) {
      this.controls[key].value = partial[key] as T[keyof T];
    }

    this.validate();

    this.hydrate(this);

    if (!this.handle.change) { return; }

    this.handle.change(this);
  }

  private eachControl(fn: <K extends keyof T>(control: FormControl<T[K]>, key?: K) => any) {
    return Object.keys(this.controls).map(k => fn(this.controls[k], k));
  }

  public submit() {
    if (!this.handle.submit) { return; }

    this.eachControl((control) => control.dirty = true);

    this.handle.submit(this);
  }

  public reset() {
    this.eachControl((control) => control.reset());
    this.hydrate(this);
  }

  public validate() {
    if (!this.validator) { return; }

    Object.entries(this.validator).map(([key, fn]) => {
      const controlError = this.controls[key].validate();
      const validatorError = fn(this);

      this.controls[key].error = controlError || validatorError || '';

      console.log();
    });

    this.isValid = !this.errors.length;
  }
}