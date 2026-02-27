import { defineConfig, PluginOption } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { globSync } from 'glob';

import react from '@vitejs/plugin-react';

function makeRollupInput() {
  // Pega tudo que vira módulo JS no build
  const files = globSync('src/**/*.{ts,tsx}', {
    ignore: [
      'src/**/*.d.ts',
      'src/**/*.test.*',
      'src/**/*.spec.*',
      'src/**/*.stories.*',
      'src/**/__tests__/**',
      'src/**/__mocks__/**',
    ],
    nodir: true,
  });

  // IMPORTANTE: o Rollup aceita input como array de paths
  // (a estrutura final vem do preserveModules + preserveModulesRoot)
  return files.map((f) => path.resolve(process.cwd(), f));
}

function bundleSingleCss(): PluginOption {
  return {
    name: 'bundle-single-css',
    generateBundle(_: any, bundle: any) {
      const cssFiles = Object.keys(bundle).filter((file) => file.endsWith('.css'));
      if (cssFiles.length === 0) return;

      // concatena na ordem que o rollup gerou
      let css = '';
      for (const file of cssFiles) {
        const chunk = bundle[file];
        if (chunk?.type === 'asset' && typeof chunk.source === 'string') {
          css += `\n/* ${file} */\n` + chunk.source;
        }
        // remove os css individuais do bundle final
        delete bundle[file];
      }

      // emite um único arquivo
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
      outDir: 'dist',
      insertTypesEntry: false,
    }),
    bundleSingleCss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@iziui/tokens/web/scss/main.scss" as *;
        `
      }
    }
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
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
        },
        {
          format: 'cjs',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
        },
      ],
    },
  },
});
