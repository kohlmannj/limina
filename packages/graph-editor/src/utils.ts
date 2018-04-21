import { IDomainRange, PointTuple } from './index.d';

export const getExtentsForPoints = (points: PointTuple[]): IDomainRange => {
  const xVals = points.map(([x]) => x);
  const yVals = points.map(([x, y]) => y);

  return {
    domain: [Math.min(...xVals), Math.max(...xVals)],
    range: [Math.min(...yVals), Math.max(...yVals)],
  };
};

export const flattenPoints = (lines: PointTuple[][]) =>
  lines.reduce((flattenedPoints, line) => [...flattenedPoints, ...line], []);
