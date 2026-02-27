export function sanitizeOnlyNumbers(value: string) {
  const regex = /[\D]/g;
  return value.replace(regex, '');
}