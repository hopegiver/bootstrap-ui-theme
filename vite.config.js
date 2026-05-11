import { defineConfig } from 'vite';
import path from 'path';

const themes = ['heroui', 'shadcn', 'nuxtui'];

import fs from 'fs';

function moveHtml(theme) {
  return {
    name: 'move-html',
    closeBundle() {
      const src = path.resolve(`dist/src/${theme}/index.html`);
      const dest = path.resolve(`dist/${theme}.html`);
      if (fs.existsSync(src)) {
        let html = fs.readFileSync(src, 'utf-8');
        html = html.replace(/\.\.\/\.\.\/([^"']+)/g, './$1');
        fs.writeFileSync(dest, html);
        fs.unlinkSync(src);
        try { fs.rmdirSync(path.resolve(`dist/src/${theme}`)); } catch {}
        try { fs.rmdirSync(path.resolve(`dist/src`)); } catch {}
      }
    },
  };
}

function buildConfig(theme) {
  return {
    base: './',
    plugins: [moveHtml(theme)],
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      rollupOptions: {
        input: { [theme]: path.resolve(`src/${theme}/index.html`) },
        output: {
          assetFileNames: `${theme}[extname]`,
          entryFileNames: `${theme}.js`,
        },
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const configs = Object.fromEntries(themes.map(t => [t, buildConfig(t)]));
  const target = configs[mode] ?? configs.heroui;

  return {
    ...target,
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
  };
});
