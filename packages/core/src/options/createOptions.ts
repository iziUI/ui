import type { Properties } from 'csstype';

import type { Plugin } from '../plugin';
import type { ThemeBuilded } from '../theme';
import type { CustomOptions } from './CustomOptions';

type Data = {
  sx: CustomOptions;
  theme: ThemeBuilded;
}

export default function createOptions({ sx, theme }: Data, ...plugins: Plugin[]) {
  return plugins.reduce<Properties>((acc, plugin) => {
    acc = { ...acc, ...plugin(theme, sx) };

    return acc;
  }, {});
}