import React, { SFC } from 'react';
import styled, { StyledComponent } from 'react-emotion';
import { IThemeProps, PointTuple } from '../../index.d';

export interface IPointProps {
  className?: string;
  x: number;
  y: number;
}

export const Point: SFC<IPointProps> = ({ className, x, y, ...rest }) => (
  <circle className={className} cx={x} cy={y} {...rest} />
);

const StyledPoint: StyledComponent<IPointProps, IThemeProps, {}> = styled(Point)(({ theme }) => ({
  r: theme.thickness * 2 || 4,
  fill: theme.color || '#000',
}));

export default StyledPoint;
