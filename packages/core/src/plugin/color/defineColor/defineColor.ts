import definePlugin from '../../definePlugin';

export default definePlugin((theme, { color }) => {
  const { palette } = theme;

  if (!color) { return {}; }

  return {
    color: color(palette)
  };
});