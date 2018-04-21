export type PointTuple = [number, number];

export interface IDomainRange {
  domain: PointTuple;
  range: PointTuple;
}

export interface IThemeProps {
  color: string;
  thickness: number;
}
