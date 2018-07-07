import React, { SFC } from 'react';
import styled from '../styled';
import { PointTuple } from '../types';
import { getDimensionsForPoints } from '../utils';

export type InterpolationKeyword = 'linear' | 'ease-in-out' | 'ease-in' | 'ease-out';

export type InterpolationFunction = (x: number) => number;

export type InterpolationKeywordOrFunction = InterpolationKeyword | InterpolationFunction;

export interface IPolyLineSVG {
  className?: string;
  interpolation?: InterpolationKeywordOrFunction;
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

const StyledPolyLineSVG = styled(PolyLineSVG)`
  fill: none;
  stroke: ${props => props.theme.color || '#000'};
  stroke-width: ${props => `${props.theme.thickness / 4 || 2}px`};
`;

export default StyledPolyLineSVG;
