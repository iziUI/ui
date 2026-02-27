import { isEmpty, isValidEmail } from '@iziui/toolkit/validators';

type Type = 'text' | 'email';

type Data<T> = {
  defaultValue: T;
  required?: boolean;
  type?: Type;
  errorMessage?: string;
}

export type Constructor<V> = ConstructorParameters<typeof FormControl<V>>[number];

export default class FormControl<V> implements Omit<Data<V>, 'errorMessage'> {
  public type: Type;
  public _value!: V;
  public defaultValue: V;
  public error = '';
  public dirty = false;
  public required: boolean;
  private errorMessage!: string;

  constructor({
    defaultValue,
    required = false,
    type = 'text',
    errorMessage = 'Campo inválido',
  }: Data<V>) {
    this.type = type;
    this.required = required;
    this.value = defaultValue;
    this.defaultValue = defaultValue;
    this.errorMessage = errorMessage;
  }

  get value(): V { return this._value; }
  set value(value: V) {
    this.dirty = true;
    this._value = value;
    this.validate();
  }

  get isInvalid() { return Boolean(this.dirty && this.error); }

  public reset() {
    this.value = this.defaultValue;
    this.dirty = false;
  }

  public validate() {
    const data: Partial<{ [x in Type]: boolean } & { required: boolean }> = {};

    data.required = this.required && isEmpty(this.value);

    if (this.value) {
      data.email = this.type === 'email' && !isValidEmail(this.value as string);
    }

    const hasError = Object.keys(data).some(key => data[key]);

    if (!hasError) {
      this.error = '';
      return '';
    }

    this.error = this.errorMessage;

    return this.error;
  }
}
