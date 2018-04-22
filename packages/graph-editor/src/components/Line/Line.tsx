import React, { SFC } from 'react';
import styled, { css, cx, Interpolation, StyledComponent } from 'react-emotion';
import { IThemeProps, PointTuple } from '../../index.d';
import { getDimensionsForPoints } from '../../utils';

export interface ILineProps {
  className?: string;
  label?: string;
  points: PointTuple[];
}

export const Line: SFC<ILineProps> = ({ className, label, points, ...rest }: ILineProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...getDimensionsForPoints(points)}>
    <polyline
      className={className}
      points={points.map(point => point.join(',')).join(' ')}
      {...rest}
    />
  </svg>
);

const StyledLine: StyledComponent<ILineProps, IThemeProps, {}> = styled(Line)(({ theme }) => ({
  fill: 'none',
  stroke: theme.color || '#000',
  strokeWidth: theme.thickness || 2,
}));

export default StyledLine;
