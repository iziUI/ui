export function joinClass(...args: Array<string | null | undefined | boolean>) {
  return args
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .join(' ');
};
