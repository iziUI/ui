import type { TransformerPlugin } from './TransformerPlugin';

export function defineTransformerPlugin(plugin: TransformerPlugin): TransformerPlugin {
  return plugin;
}