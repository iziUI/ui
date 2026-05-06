import { boxShadowSmall, boxShadowRegular, boxShadowLarge } from '@iziui/tokens/web/js';

import definePlugin from '../../definePlugin';
import type { CustomOptions } from '../../../options/CustomOptions';

type ExtractSize = NonNullable<CustomOptions['boxShadow']>;

export default definePlugin((_, { boxShadow }) => {

  if (!boxShadow) { return {}; }

  const sizes: { [s in ExtractSize]: string } = {
    sm: boxShadowSmall,
    md: boxShadowRegular,
    lg: boxShadowLarge,
  };

  return {
    boxShadow: sizes[boxShadow]
  };
});