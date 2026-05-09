import dts from 'vite-plugin-dts';
import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import { defineConfig, type PluginOption } from 'vite';

import react from '@vitejs/plugin-react';

type GroupConfig = Record<string, string[]>;

const componentGroups: GroupConfig = {
  components: ['actions', 'display', 'feedback', 'fields', 'layout', 'navigation'],
  animations: ['animations'],
  lab: ['lab'],
  hooks: ['hooks'],
};

const flatGroups: GroupConfig = {
  theme: ['core', 'theme'],
};

const TYPES_DIR = '.types';
const TMP_ENTRY_DIR = path.resolve(process.cwd(), 'node_modules/.cache/iziui-react');

const COMPONENT_GLOB_IGNORES = [
  'src/**/*.d.ts',
  'src/**/*.test.*',
  'src/**/*.spec.*',
  'src/**/*.stories.*',
  'src/**/__tests__/**',
  'src/**/__mocks__/**',
];

function listComponentEntries(srcGroup: string) {
  return globSync(`src/${srcGroup}/*/index.{ts,tsx}`, {
    nodir: true,
    ignore: COMPONENT_GLOB_IGNORES,
  });
}

function ensureFlatEntry(distGroup: string, srcGroups: string[]) {
  fs.mkdirSync(TMP_ENTRY_DIR, { recursive: true });
  const entryPath = path.join(TMP_ENTRY_DIR, `${distGroup}.ts`);
  const content =
    srcGroups
      .map((srcGroup) => {
        const abs = path.resolve(process.cwd(), 'src', srcGroup).replace(/\\/g, '/');
        return `export * from '${abs}';`;
      })
      .join('\n') + '\n';
  fs.writeFileSync(entryPath, content);
  return entryPath;
}

function makeRollupInput() {
  const entries: Record<string, string> = {
    index: path.resolve(process.cwd(), 'src/index.ts'),
  };

  for (const [distGroup, srcGroups] of Object.entries(componentGroups)) {
    for (const srcGroup of srcGroups) {
      for (const file of listComponentEntries(srcGroup)) {
        const componentName = path.basename(path.dirname(file));
        entries[`${distGroup}/${componentName}/index`] = path.resolve(process.cwd(), file);
      }
    }
  }

  for (const [distGroup, srcGroups] of Object.entries(flatGroups)) {
    entries[`${distGroup}/index`] = ensureFlatEntry(distGroup, srcGroups);
  }

  return entries;
}

function generateGroupedTypes(): PluginOption {
  return {
    name: 'generate-grouped-types',
    closeBundle() {
      const distRoot = path.resolve(process.cwd(), 'dist');

      fs.writeFileSync(
        path.join(distRoot, 'index.d.ts'),
        `export * from './${TYPES_DIR}/index';\n`,
      );

      for (const [distGroup, srcGroups] of Object.entries(componentGroups)) {
        for (const srcGroup of srcGroups) {
          for (const file of listComponentEntries(srcGroup)) {
            const componentName = path.basename(path.dirname(file));
            const distDir = path.join(distRoot, distGroup, componentName);
            const typesPath = `../../${TYPES_DIR}/${srcGroup}/${componentName}`;

            fs.mkdirSync(distDir, { recursive: true });
            fs.writeFileSync(
              path.join(distDir, 'index.d.ts'),
              `export { default } from '${typesPath}';\nexport * from '${typesPath}';\n`,
            );
          }
        }
      }

      for (const [distGroup, srcGroups] of Object.entries(flatGroups)) {
        const distDir = path.join(distRoot, distGroup);
        fs.mkdirSync(distDir, { recursive: true });

        const reexports =
          srcGroups
            .map((srcGroup) => `export * from '../${TYPES_DIR}/${srcGroup}';`)
            .join('\n') + '\n';

        fs.writeFileSync(path.join(distDir, 'index.d.ts'), reexports);
      }
    },
  };
}

function bundleSingleCss(): PluginOption {
  return {
    name: 'bundle-single-css',
    generateBundle(_: any, bundle: any) {
      const cssFiles = Object.keys(bundle).filter((file) => file.endsWith('.css'));
      if (cssFiles.length === 0) return;

      let css = '';

      for (const file of cssFiles) {
        const chunk = bundle[file];

        if (chunk?.type === 'asset' && typeof chunk.source === 'string') {
          css += `\n/* ${file} */\n` + chunk.source;
        }

        delete bundle[file];
      }

      bundle['style.css'] = {
        type: 'asset',
        fileName: 'style.css',
        source: css,
      };
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.json',
      entryRoot: 'src',
      outDir: `dist/${TYPES_DIR}`,
      insertTypesEntry: false,
    }),
    generateGroupedTypes(),
    bundleSingleCss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@iziui/tokens/web/scss/main.scss" as *;
        `,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      input: makeRollupInput(),
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
        },
        {
          format: 'cjs',
          exports: 'named',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
        },
      ],
    },
  },
});
