export * from './components/ScrollBar';
export * from './components/ScrollView';
export * from './components/Graph';
export * from './components/Point';
export * from './components/PolyLineSVG';
export * from './components/ScrollBarCorner';
export * from './components/ScrollGraph';
export * from './components/ViewBoxContext';
export * from './scrollBarTheme';
export * from './utils';

export type PointTuple = [number, number];
export type PointShape = 'circle' | 'diamond' | 'square';
export type OriginDirection = 'top' | 'bottom' | 'left' | 'right';
export type ScrollBarAxis = 'x' | 'y';
export type OverflowMode = 'scroll' | 'auto';

export interface ViewBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  originX?: OriginDirection;
  originY?: OriginDirection;
}

export interface DomainRange {
  domain: PointTuple;
  range: PointTuple;
}

export interface ThemeProps {
  color: string;
  thickness: number;
  shape: PointShape;
}
