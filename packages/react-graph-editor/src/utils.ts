import { IDomainRange, IViewBox, PointTuple } from './index.d';

export const getExtentsForPoints = (points: PointTuple[]): IDomainRange => {
  const xVals = points.map(([x]) => x);
  const yVals = points.map(point => point[1]);

  return {
    domain: [Math.min(...xVals), Math.max(...xVals)],
    range: [Math.min(...yVals), Math.max(...yVals)],
  };
};

export const getViewBoxForPoints = (points: PointTuple[], padding = 0): IViewBox => {
  const { domain, range } = getExtentsForPoints(points);

  return {
    minX: domain[0] - padding,
    minY: range[0] - padding,
    maxX: domain[1] + padding,
    maxY: range[1] + padding,
    width: Math.abs(domain[1] - domain[0]) + padding * 2,
    height: Math.abs(range[1] - range[0]) + padding * 2,
  };
};

export const getDimensionsForPoints = (points: PointTuple[], padding = 0) => {
  const { width, height } = getViewBoxForPoints(points, padding);
  return { width, height };
};

export const flattenPoints = (lines: PointTuple[][]) =>
  lines.reduce((flattenedPoints, line) => [...flattenedPoints, ...line], []);
