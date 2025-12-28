import { hexToHsl } from '../../utils/hexToHsl';
import { adjustLightness } from '../../utils/adjustLightness';
import { getOpacityColor } from '../../utils/getOpacityColor';
import { getContrastColor } from '../../utils/getContrastColor';
import { defineFormatterPlugin } from '../defineFormatterPlugin';
import { colors } from '../../consts';

export default defineFormatterPlugin(() => {
  return {
    name: 'css/variables-custom',
    format: ({ dictionary }) => {
      const variation = 20;
      const lines: string[] = [':root {'];

      const TOKES_TO_MAP = [...colors, 'grey'];

      dictionary.allTokens.forEach((token) => {
        const key = token.attributes?.type as string;
        const name = token.name;
        const value = token.value;

        if (TOKES_TO_MAP.includes(key)) {
          const hsl = hexToHsl(value);

          lines.push(`  --${name}-contrast: ${getContrastColor(value)};`);
          lines.push(`  --${name}-light: ${adjustLightness(hsl.h, hsl.s, hsl.l, variation)};`);
          lines.push(`  --${name}-dark: ${adjustLightness(hsl.h, hsl.s, hsl.l, -variation)};`);
          lines.push(`  --${name}-opacity: ${getOpacityColor(value, variation / 100)};`);
        }

        lines.push(`  --${name}: ${value};`);
      });

      lines.push('}');

      return lines.join('\n');
    }
  };
});
