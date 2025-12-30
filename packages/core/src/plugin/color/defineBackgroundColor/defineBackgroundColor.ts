import definePlugin from '../../definePlugin';

export default definePlugin((theme, { backgroundColor }) => {
  const { palette } = theme;

  if (!backgroundColor) { return {}; }

  return {
    backgroundColor: backgroundColor(palette)
  };
});