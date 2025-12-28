import type StyleDictionary from 'style-dictionary';

import type { FormatterPuglin } from './FormatterPuglin';

export async function applyFormatters(SD: StyleDictionary, plugins: FormatterPuglin[]): Promise<void> {
  await Promise.all(
    plugins.map(async (plugin) => {
      const formatter = plugin();
      SD.registerFormat(formatter);
    })
  );
}