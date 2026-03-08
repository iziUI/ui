import type { ThemeBuilded, Color } from '../Theme';

function setColor(name: string, color: Color) {
  document.documentElement.style.setProperty(`--${name}`, color.main);
  document.documentElement.style.setProperty(`--${name}-light`, color.light);
  document.documentElement.style.setProperty(`--${name}-dark`, color.dark);
  document.documentElement.style.setProperty(`--${name}-contrast`, color.contrast);
  document.documentElement.style.setProperty(`--${name}-opacity`, color.opacity);
}

function ensureStylesheet(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

export function applyTheme(theme: ThemeBuilded) {
  if (typeof window === 'undefined') { return; }

  const { palette, shape, spacing, typography } = theme;

  if (typography.url) { ensureStylesheet(typography.url); }

  // COLORS
  setColor('info', palette.info);
  setColor('error', palette.error);
  setColor('warning', palette.warning);
  setColor('success', palette.success);
  setColor('primary', palette.primary);
  setColor('secondary', palette.secondary);

  // GREY
  setColor('grey', palette.grey);

  // TYPOGRAPHY
  document.documentElement.style.setProperty('--typography', typography.family);

  // TEXT
  document.documentElement.style.setProperty('--text-primary', palette.text?.primary);
  document.documentElement.style.setProperty('--text-secondary', palette.text?.secondary);
  document.documentElement.style.setProperty('--text-disabled', palette.text?.disabled);

  // BACKGROUND
  document.documentElement.style.setProperty('--background-paper', palette.background?.paper);
  document.documentElement.style.setProperty('--background-default', palette.background?.default);

  // DIVIDER
  document.documentElement.style.setProperty('--divider', palette.divider);

  // SHAPE
  document.documentElement.style.setProperty('--radius', `${shape.radius}px`);

  // SPACING
  document.documentElement.style.setProperty('--spacing', `${spacing}px`);
}