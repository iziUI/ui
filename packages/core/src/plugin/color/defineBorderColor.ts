import definePlugin from '../definePlugin';

export default definePlugin((theme, { borderColor }) => {
  const { palette } = theme;

  if (!borderColor) { return {}; }

  return {
    borderColor: borderColor(palette)
  };
});