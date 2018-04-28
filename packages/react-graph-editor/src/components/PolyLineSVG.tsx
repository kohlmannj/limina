import React, { SFC } from 'react';
import styled, { css, cx, Interpolation, StyledComponent } from 'react-emotion';
import { IThemeProps, PointTuple } from '../index';
import { getDimensionsForPoints } from '../utils';

export interface IPolyLineSVG {
  className?: string;
  label?: string;
  points: PointTuple[];
}

export const PolyLineSVG: SFC<IPolyLineSVG> = ({
  className,
  label,
  points,
  ...rest
}: IPolyLineSVG) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...getDimensionsForPoints(points)}>
    <polyline
      className={className}
      vectorEffect="non-scaling-stroke"
      points={points.map(point => point.join(',')).join(' ')}
      {...rest}
    />
  </svg>
);

const StyledPolyLineSVG: StyledComponent<IPolyLineSVG, IThemeProps, {}> = styled(PolyLineSVG)`
  fill: none;
  stroke: ${props => props.theme.color || '#000'};
  stroke-width: ${props => `${props.theme.thickness / 4 || 2}px`};
`;

export default StyledPolyLineSVG;
