import { IDomainRange, PointTuple } from './index.d';

export const getExtentsForPoints = (points: PointTuple[]): IDomainRange => {
  const xVals = points.map(([x]) => x);
  const yVals = points.map(([x, y]) => y);

  return {
    domain: [Math.min(...xVals), Math.max(...xVals)],
    range: [Math.min(...yVals), Math.max(...yVals)],
  };
};

export const getViewBoxValuesForPoints = (points: PointTuple[], padding = 0): number[] => {
  const { domain, range } = getExtentsForPoints(points);
  const minX = domain[0] - padding;
  const minY = range[0] - padding;
  const w = domain[1] - domain[0] + padding * 2;
  const h = range[1] - range[0] + padding * 2;
  return [minX, minY, w, h];
};

export const getDimensionsForPoints = (points: PointTuple[], padding = 0) => {
  const [minX, minY, w, h] = getViewBoxValuesForPoints(points, padding);
  return { width: w, height: h };
};

export const flattenPoints = (lines: PointTuple[][]) =>
  lines.reduce((flattenedPoints, line) => [...flattenedPoints, ...line], []);
