import type { Dictionary } from 'style-dictionary/types';

import { capitalize } from '@iziui/toolkit/string';

import * as constModule from '../../consts';
import { defineFormatterPlugin } from '../defineFormatterPlugin';

function mapVariable(name: string, value: string) {
  return `export const ${name} = "${value}";`;
}

function mapTokens(dictionary: Dictionary) {
  const tokens = dictionary.allTokens.map(({ path, value }) => {
    const tokenSegments = path.slice(1);

    const variableName = tokenSegments
      .map(segment =>
        segment
          .split('-')
          .map((piece, index) => (index === 0 ? piece : capitalize(piece)))
          .join('')
      )
      .join('');

    const normalizedName =
      variableName.charAt(0).toLowerCase() + variableName.slice(1);

    return mapVariable(normalizedName, value);
  });

  return tokens.join('\n');
}

function mapList(name: string, list: string[]) {
  return `export const ${name} = [${list.map(i => `'${i}'`).join()}];\n`;
}

function mapObject(name: string, data: Record<string, string | number>) {
  const values = Object.entries(data)
    .map(([key, value]) => `${key}: '${value}'`)
    .join(',\n  ');
  return `export const ${name} = {
  ${values}
};
  `;
}

export default defineFormatterPlugin(() => {
  return {
    name: 'javascript/variables-custom',
    format: ({ dictionary }) => {
      const tokens = mapTokens(dictionary);

      const groups = Object.entries(constModule)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return mapList(key.toLocaleLowerCase(), value);
          }

          if (typeof value === 'object') {
            return mapObject(key.toLocaleLowerCase(), value);
          }

          return mapVariable(key.toLocaleLowerCase(), value);
        }, []);

      return [
        tokens,
        ...groups,
      ].join('\n');
    }
  };
});
