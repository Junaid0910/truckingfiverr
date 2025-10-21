export const defaultTheme = {
  /* Primary = Red */
  '--Color-primary': '#ef4444',
  '--color-primary': '#ef4444', /* red-500 */
  '--color-primary-600': '#ef4444',
  '--color-primary-700': '#b91c1c', /* red-700 */
  '--color-primary-50': '#fff1f2',
  '--color-primary-foreground': '#ffffff',

  /* Accent = Yellow */
  '--color-accent': '#f59e0b', /* amber/yellow */

  /* Dark background and text */
  '--color-bg': '#000000',
  '--color-surface': '#0b0b0b',
  '--color-card': '#0f0f10',
  '--color-text': '#ffffff',
  '--color-muted': '#94a3b8',
  '--color-border': 'rgba(255,255,255,0.06)',
};

export function applyTheme(theme: Record<string, string> = defaultTheme) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export default applyTheme;
