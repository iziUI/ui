import type { Path } from '@iziui/toolkit/interface';

import type { PaletteBuilded } from '../theme';

export function convertPathToColor(path: Path<PaletteBuilded>, palette: PaletteBuilded): string {
  return path.split('.').reduce((acc, key) => {
    if (acc && acc[key]) { return acc[key]; }

    return palette[key];
  }, '');
}