type Type = 'text' | 'email';
type Validator<C> = (control: FormControl<C>) => string | false | void;

type Data<T> = {
  defaultValue: T;
  type?: Type;
  validators?: Validator<T>[];
}

export type Constructor<V> = ConstructorParameters<typeof FormControl<V>>[number];

export default class FormControl<V> implements Pick<Data<V>, 'type'> {
  private _value!: V;
  private defaultValue: V;
  private validators: Validator<V>[] = [];

  public type: Type;
  public error = '';
  public dirty = false;

  constructor({
    defaultValue,
    type = 'text',
    validators,
  }: Data<V>) {
    this.type = type;
    this._value = defaultValue;
    this.defaultValue = defaultValue;

    if (validators) { this.validators = validators; }
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
    const errors = this.validators
      .map(v => v(this))
      .filter(Boolean);

    this.error = errors[0] || '';

    return this.error;
  }
}
