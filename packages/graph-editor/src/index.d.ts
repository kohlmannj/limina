export type PointTuple = [number, number];

export type PointShape = 'circle' | 'diamond' | 'square';

export type OriginDirection = 'top' | 'bottom' | 'left' | 'right';

export interface IViewBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  originX?: OriginDirection;
  originY?: OriginDirection;
}

export interface IDomainRange {
  domain: PointTuple;
  range: PointTuple;
}

export interface IThemeProps {
  color?: string;
  thickness?: number;
  shape?: PointShape;
}
