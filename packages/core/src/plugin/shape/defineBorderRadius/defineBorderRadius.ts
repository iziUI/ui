import definePlugin from '../../definePlugin';

export default definePlugin((theme, { borderRadius }) => {
  const { shape } = theme;

  if (!borderRadius) { return {}; }

  return {
    borderRadius: `${shape.radius * borderRadius}px`
  };
});