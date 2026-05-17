import type { Path } from '@iziui/toolkit/interface';

import type { PaletteBuilded } from '../../theme';

type Indexable = Record<string, unknown>;

export function convertPathToColor(path: Path<PaletteBuilded>, palette: PaletteBuilded): string {
  return path.split('.').reduce<unknown>((acc, key) => {
    const node = acc as Indexable | undefined;
    if (node && node[key]) { return node[key]; }

    return (palette as unknown as Indexable)[key];
  }, '') as string;
}