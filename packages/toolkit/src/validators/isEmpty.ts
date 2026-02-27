export function isEmpty(value: any): boolean {
  const type = typeof value;
  let isEmpty = false;

  if (type === 'boolean') {
    isEmpty = !value;
  } else if (type !== 'object') {
    isEmpty = !value;
  }

  return isEmpty;
}