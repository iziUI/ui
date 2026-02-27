import type { MaskOptions } from './MaskOptions';

function leadingZerosValue(value: string, length: number): string {
  const unformattedValue = value.toString().replace(/\D/g, '');
  return unformattedValue.padStart(length, '0');
}

export function mask(value: string, { mask, regex, length }: MaskOptions) {

  const based = leadingZerosValue(value, length);

  return based.replace(regex, mask);
}