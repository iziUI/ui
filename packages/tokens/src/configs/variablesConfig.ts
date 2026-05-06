import StyleDictionary from 'style-dictionary';
import type { Config } from 'style-dictionary/types';

import { applyFormatters } from '../formatters';
import { applyTransformers } from '../transformers';
import dtsFormatter from '../formatters/plugins/dtsFormatter';
import jsFormatter from '../formatters/plugins/jsFormatter';
import scssFormatter from '../formatters/plugins/scssFormatter';
import scssMainFormatter from '../formatters/plugins/scssMainFormatter';
import scssMixinsFormatter from '../formatters/plugins/scssMixinsFormatter';
import removeFirstPathTransformer from '../transformers/plugins/removeFirstPathTransformer';

const getConfig = (): Config => {
  return {
    source: [
      'src/_base/*.json',
    ],
    platforms: {
      'web/scss': {
        transformGroup: 'css-custom',
        buildPath: 'dist/web/scss',
        prefix: 'izi--',
        files: [
          {
            destination: 'variables.scss',
            format: 'scss/variables-custom',
            options: { outputReferences: true }
          },
          {
            destination: 'mixins.scss',
            format: 'scss/custom-mixins',
          },
          {
            destination: 'main.scss',
            format: 'scss/custom-main',
          },
        ]
      },
      'web/js': {
        transformGroup: 'js',
        buildPath: 'dist/web/js',
        files: [
          {
            destination: 'index.js',
            format: 'javascript/variables-custom',
            options: { showFileHeader: false },
          },
          {
            destination: 'index.d.ts',
            format: 'typescript/declarations-custom',
            options: { showFileHeader: false },
          },
        ],
      }
    }
  };
};

export default async function configVariables() {
  const config = getConfig();

  const styleDictionary = new StyleDictionary(config);

  const transformers = await applyTransformers(styleDictionary, [
    removeFirstPathTransformer
  ]);

  await applyFormatters(styleDictionary, [
    jsFormatter,
    dtsFormatter,
    scssFormatter,
    scssMixinsFormatter,
    scssMainFormatter,
  ]);

  styleDictionary.registerTransformGroup({
    name: 'css-custom',
    transforms: [
      'attribute/cti',
      'color/hex',
      ...transformers
    ],
  });

  styleDictionary.buildAllPlatforms();
}