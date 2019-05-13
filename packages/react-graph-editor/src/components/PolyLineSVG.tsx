import React, { FunctionComponent } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { getDimensionsForPoints } from '../utils';
import { ThemeProps, PointTuple } from '..';

export type InterpolationKeyword = 'linear' | 'ease-in-out' | 'ease-in' | 'ease-out';

export type InterpolationFunction = (x: number) => number;

export type InterpolationKeywordOrFunction = InterpolationKeyword | InterpolationFunction;

export interface PolyLineSVGProps {
  className?: string;
  interpolation?: InterpolationKeywordOrFunction;
  label?: string;
  points: PointTuple[];
}

export const PolyLineSVG: FunctionComponent<PolyLineSVGProps> = ({
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label,
  points,
  ...rest
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...getDimensionsForPoints(points)}>
    <polyline
      className={className}
      vectorEffect="non-scaling-stroke"
      points={points.map(point => point.join(',')).join(' ')}
      {...rest}
    />
  </svg>
);

export const StyledPolyLineSVG: StyledComponent<
  PolyLineSVGProps,
  PolyLineSVGProps,
  ThemeProps
> = styled(PolyLineSVG)`
  fill: none;
  stroke: ${props => props.theme.color || '#000'};
  stroke-width: ${props => `${props.theme.thickness / 4 || 2}px`};
`;
