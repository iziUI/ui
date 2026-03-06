import definePlugin from '../../definePlugin';

export default definePlugin((theme, { m, mb, ml, mr, mt, mx, my }) => {
  const { spacing } = theme;

  const calculateMargin = (mg?: number) => {
    return !!mg || mg === 0 ? `${String(mg * spacing)}px` : '';
  };

  const hasM = calculateMargin(m);

  const hasMt = calculateMargin(mt);
  const hasMb = calculateMargin(mb);

  const hasMy = calculateMargin(my);
  const hasMx = calculateMargin(mx);

  const hasMl = calculateMargin(ml);
  const hasMr = calculateMargin(mr);

  return {
    margin: hasM,
    marginTop: hasMt || hasMy || hasM,
    marginBottom: hasMb || hasMy || hasM,
    marginLeft: hasMl || hasMx || hasM,
    marginRight: hasMr || hasMx || hasM,
  };
});