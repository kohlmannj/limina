export type PointTuple = [number, number];

export type PointShape = 'circle' | 'diamond' | 'square';

export interface IDomainRange {
  domain: PointTuple;
  range: PointTuple;
}

export interface IThemeProps {
  color?: string;
  thickness?: number;
  shape?: PointShape;
}
