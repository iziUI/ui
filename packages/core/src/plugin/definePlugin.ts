import type { Properties } from 'csstype';

import type { ThemeBuilded } from '../theme';
import type { CustomOptions } from '../options';
import type { Plugin } from './plugin';

export default function definePlugin(cb: (theme: ThemeBuilded, options: CustomOptions) => Properties): Plugin {
  return cb;
}