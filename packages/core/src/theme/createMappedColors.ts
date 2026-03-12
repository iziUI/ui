import type { MappedColors, Colors, colors } from './Theme';

function generateMappedColor(color: Colors): MappedColors[] {
  return [
    `${color}.main`,
    `${color}.dark`,
    `${color}.light`,
    `${color}.opacity`,
    `${color}.contrast`,
  ];
}

export function createMappedColors(_colors: typeof colors): MappedColors[] {
  return _colors.reduce<MappedColors[]>((acc, color) => {
    const mapped = generateMappedColor(color);

    acc = [...acc, ...mapped];

    return acc;
  }, [
    'text.primary',
    'text.secondary',
    'text.disabled',
    'background.paper',
    'background.default',
    'divider'
  ]);
}