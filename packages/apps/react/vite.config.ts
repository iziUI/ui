import dts from 'vite-plugin-dts';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { globSync } from 'glob';
import { defineConfig, type PluginOption } from 'vite';

import react from '@vitejs/plugin-react';

const WORKSPACE_ROOT = path.resolve(__dirname, '../../..');
const INTERNAL_DIR = '_internal';

type InternalPkg = {
  name: string;
  alias: string;
  srcDir?: string;
  prebuiltDir?: string;
};

const INTERNAL_PACKAGES: InternalPkg[] = [
  { name: 'core', alias: '@iziui/core', srcDir: path.join(WORKSPACE_ROOT, 'packages/core/src') },
  { name: 'toolkit', alias: '@iziui/toolkit', srcDir: path.join(WORKSPACE_ROOT, 'packages/toolkit/src') },
  { name: 'tokens', alias: '@iziui/tokens', prebuiltDir: path.join(WORKSPACE_ROOT, 'packages/tokens/dist') },
];

type GroupConfig = Record<string, string[]>;

const componentGroups: GroupConfig = {
  components: ['actions', 'display', 'feedback', 'fields', 'layout', 'navigation'],
  animations: ['animations'],
  lab: ['lab'],
  hooks: ['hooks'],
};

const flatGroups: GroupConfig = {
  theme: ['core', 'theme'],
  core: ['@iziui/core/utils'],
};

const INTERNAL_PKG_PREFIX = '@iziui/';

function isInternalPkgSpecifier(srcGroup: string) {
  return srcGroup.startsWith(INTERNAL_PKG_PREFIX);
}

function internalPkgToTypesPath(srcGroup: string) {
  const sub = srcGroup.slice(INTERNAL_PKG_PREFIX.length);
  return `${INTERNAL_DIR}/${sub}`;
}

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
        if (isInternalPkgSpecifier(srcGroup)) {
          return `export * from '${srcGroup}';`;
        }
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
            .map((srcGroup) => {
              const target = isInternalPkgSpecifier(srcGroup)
                ? internalPkgToTypesPath(srcGroup)
                : srcGroup;
              return `export * from '../${TYPES_DIR}/${target}';`;
            })
            .join('\n') + '\n';

        fs.writeFileSync(path.join(distDir, 'index.d.ts'), reexports);
      }
    },
  };
}

function emitInternalDeclarations(srcDir: string, outDir: string) {
  const files = globSync('**/*.ts', {
    cwd: srcDir,
    nodir: true,
    ignore: ['**/*.spec.ts', '**/*.test.ts', '**/__tests__/**', '**/__mocks__/**'],
  }).map((f) => path.join(srcDir, f));

  const program = ts.createProgram(files, {
    declaration: true,
    emitDeclarationOnly: true,
    outDir,
    rootDir: srcDir,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    esModuleInterop: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    strict: false,
    noEmitOnError: false,
    noImplicitAny: false,
  });

  program.emit();
}

function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (entry.isFile()) fs.copyFileSync(s, d);
  }
}

function rewriteInternalImports(typesRoot: string) {
  const aliasToInternalDir = new Map(
    INTERNAL_PACKAGES.map((p) => [p.alias, path.join(typesRoot, INTERNAL_DIR, p.name)] as const),
  );
  const aliasPattern = INTERNAL_PACKAGES.map((p) => p.alias.replace(/[/\\]/g, '\\$&')).join('|');
  const re = new RegExp(`(['"\`])(${aliasPattern})(/[^'"\`]*)?\\1`, 'g');

  const files = globSync('**/*.d.ts', { cwd: typesRoot, nodir: true });
  for (const rel of files) {
    const filePath = path.join(typesRoot, rel);
    const original = fs.readFileSync(filePath, 'utf8');

    const rewritten = original.replace(re, (_match, quote, alias, sub = '') => {
      const targetDir = aliasToInternalDir.get(alias)!;
      const target = sub ? path.join(targetDir, sub) : targetDir;
      let relPath = path.relative(path.dirname(filePath), target).replace(/\\/g, '/');
      if (!relPath.startsWith('.')) relPath = './' + relPath;
      return `${quote}${relPath}${quote}`;
    });

    if (rewritten !== original) fs.writeFileSync(filePath, rewritten);
  }
}

function inlineInternalPackages(): PluginOption {
  return {
    name: 'inline-internal-packages',
    closeBundle() {
      const typesRoot = path.resolve(process.cwd(), 'dist', TYPES_DIR);
      const internalRoot = path.join(typesRoot, INTERNAL_DIR);

      fs.mkdirSync(internalRoot, { recursive: true });

      for (const pkg of INTERNAL_PACKAGES) {
        const target = path.join(internalRoot, pkg.name);
        if (pkg.srcDir) {
          emitInternalDeclarations(pkg.srcDir, target);
        } else if (pkg.prebuiltDir) {
          if (!fs.existsSync(pkg.prebuiltDir)) {
            throw new Error(
              `[inline-internal-packages] Missing prebuilt types for ${pkg.alias} at ${pkg.prebuiltDir}. ` +
              'Build @iziui/tokens before @iziui/react.',
            );
          }
          copyDir(pkg.prebuiltDir, target);
        }
      }

      rewriteInternalImports(typesRoot);
    },
  };
}

function copyTokensScss(): PluginOption {
  return {
    name: 'copy-tokens-scss',
    closeBundle() {
      const tokensPkg = INTERNAL_PACKAGES.find((p) => p.name === 'tokens');
      const src = tokensPkg?.prebuiltDir && path.join(tokensPkg.prebuiltDir, 'web/scss');
      if (!src || !fs.existsSync(src)) {
        throw new Error(
          `[copy-tokens-scss] Missing tokens SCSS at ${src}. Build @iziui/tokens before @iziui/react.`,
        );
      }
      copyDir(src, path.resolve(process.cwd(), 'dist/scss'));
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
    inlineInternalPackages(),
    copyTokensScss(),
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
