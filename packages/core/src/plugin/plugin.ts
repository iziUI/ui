import type { Properties } from 'csstype';

import type { ThemeBuilded } from '../theme';
import type { CustomOptions } from '../options';

export type Plugin = (theme: ThemeBuilded, options: CustomOptions) => Properties;
