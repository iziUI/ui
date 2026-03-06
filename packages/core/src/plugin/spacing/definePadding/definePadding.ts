import definePlugin from '../../definePlugin';

export default definePlugin((theme, { p, pb, pl, pr, pt, px, py }) => {
  const { spacing } = theme;

  const calculatePadding = (pd?: number) => {
    return !!pd || pd === 0 ? `${String(pd * spacing)}px` : '';
  };

  const hasP = calculatePadding(p);

  const hasPt = calculatePadding(pt);
  const hasPb = calculatePadding(pb);

  const hasPy = calculatePadding(py);
  const hasPx = calculatePadding(px);

  const hasPl = calculatePadding(pl);
  const hasPr = calculatePadding(pr);

  return {
    padding: hasP,
    paddingTop: hasPt || hasPy || hasP,
    paddingBottom: hasPb || hasPy || hasP,
    paddingLeft: hasPl || hasPx || hasP,
    paddingRight: hasPr || hasPx || hasP,
  };
});