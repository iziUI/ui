import Option, { type OptionProps, type OptionValue } from '../Select/Option';

export interface AutocompleteButtonProps<T> extends Omit<OptionProps, 'value'> {
  value: T;
}

export default function AutocompleteButton<T>({ value, ...props }: AutocompleteButtonProps<T>) {
  const optionValue: OptionValue = typeof value === 'string' || typeof value === 'number' ? value : '';

  return <Option {...props} value={optionValue} />;
}
