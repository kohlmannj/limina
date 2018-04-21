import React, { SFC } from 'react';
import styled, { StyledComponent } from 'react-emotion';
import { IThemeProps, PointTuple } from '../../index.d';

export interface ILineProps {
  className?: string;
  label?: string;
  points: PointTuple[];
}

export const Line: SFC<ILineProps> = ({ className, label, points, ...rest }: ILineProps) => (
  <polyline
    className={className}
    points={points.map(point => point.join(',')).join(' ')}
    {...rest}
  />
);

const StyledLine: StyledComponent<ILineProps, IThemeProps, {}> = styled(Line)(({ theme }) => ({
  fill: 'none',
  stroke: theme.color || '#000',
  strokeWidth: theme.thickness || 2,
}));

export default StyledLine;
