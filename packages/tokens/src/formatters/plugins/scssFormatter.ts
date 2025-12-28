
import * as constModule from '../../consts';
import { defineFormatterPlugin } from '../defineFormatterPlugin';

function mapList(name: string, list: string[]) {
  return `$${name}: (
  ${list.map(i => `'${i}',`).join('\n  ')}
);\n`;
}

function mapVariable(name: string, value: string) {
  return `$${name}: '${value}';\n`;
}

function mapObject(name: string, data: Record<string, string | number>) {
  const values = Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join(',\n  ');
  return `$${name}: (
  ${values}
);
  `;
}

export default defineFormatterPlugin(() => {
  return {
    name: 'scss/variables-custom',
    format: ({ dictionary }) => {
      const tokens = dictionary.allTokens.map((token) => {
        const path = token.path;
        const value = token.value;

        const name = path
          .slice(1, path.length)
          .join('-');

        return `$${name}: ${value};`;
      });

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
        ...groups,
        ...tokens,
      ].join('\n');
    }
  };
});
