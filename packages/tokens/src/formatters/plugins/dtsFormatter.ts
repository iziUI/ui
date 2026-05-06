import type { Dictionary } from 'style-dictionary/types';

import { capitalize } from '@iziui/toolkit/string';

import { defineFormatterPlugin } from '../defineFormatterPlugin';

function mapTokenDeclaration(name: string) {
  return `export declare const ${name}: string;`;
}

function mapTokens(dictionary: Dictionary) {
  return dictionary.allTokens.map(({ path }) => {
    const tokenSegments = path.slice(1);

    const variableName = tokenSegments
      .map(segment =>
        segment
          .split('-')
          .map((piece) => capitalize(piece))
          .join('')
      )
      .join('');

    const normalizedName = variableName.charAt(0).toLowerCase() + variableName.slice(1);

    return mapTokenDeclaration(normalizedName);
  }).join('\n');
}

export default defineFormatterPlugin(() => {
  return {
    name: 'typescript/declarations-custom',
    format: ({ dictionary }) => {
      const tokens = mapTokens(dictionary);

      const reExports = [
        'export * from \'./list\';',
        'export * from \'./const\';',
        'export * from \'./object\';',
      ].join('\n');

      return [tokens, reExports].join('\n');
    }
  };
});
