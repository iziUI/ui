import definePlugin from '../../definePlugin';

export default definePlugin((theme, { background }) => {
  const { palette } = theme;

  if (!background) { return {}; }

  return {
    background: background(palette)
  };
});