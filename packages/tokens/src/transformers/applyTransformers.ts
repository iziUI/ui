import type StyleDictionary from 'style-dictionary';

import type { TransformerPlugin } from './TransformerPlugin';

export async function applyTransformers(SD: StyleDictionary, plugins: TransformerPlugin[]): Promise<Array<string>> {
  return await Promise.all(
    plugins.map(async (plugin) => {
      const transform = plugin();
      SD.registerTransform(transform);

      return transform.name;
    })
  );
}