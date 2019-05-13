/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import { FunctionComponent } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { ViewBoxContext } from './ViewBoxContext';
import { ThemeProps, ViewBox, OriginDirection, PointShape } from '..';

export interface PointProps {
  className?: string;
  selected?: boolean;
  x: number;
  y: number;
}

export interface StyledButtonProps extends PointProps, ViewBox {}

const getOriginTranslateFactor = (origin: OriginDirection) =>
  origin === 'left' || origin === 'top' ? -0.5 : 0.5;

export type DynamicStyle = (props: PointProps) => SerializedStyles | undefined;

export const shapes: Record<PointShape, DynamicStyle> = {
  circle: () => css`
    border-radius: 50%;
  `,
  diamond: () => undefined,
  square: () => undefined,
};

const selectedClassName = (props: PointProps & { theme?: ThemeProps }) => css`
  border-color: ${props.theme && props.theme.color ? props.theme.color : '#000'};
  background: #fff;
  box-shadow: 0 0 5px 2px rgba(59, 153, 252, 0.75);
`;

const translate = (props: StyledButtonProps) =>
  props.originX && props.originY
    ? `translate(${getOriginTranslateFactor(props.originX) * 100}%, ${getOriginTranslateFactor(
        props.originY
      ) * 100}%)`
    : '';

const position = (props: StyledButtonProps & { theme?: ThemeProps }) => css`
  position: absolute;
  ${props.originX && `${props.originX}: ${((props.x - props.minX) / props.width) * 100}%;`}
  ${props.originY && `${props.originY}: ${((props.y - props.minY) / props.height) * 100}%;`}
  transform: ${translate(props)} ${
  props.theme && props.theme.shape === 'diamond' ? 'rotate(45deg)' : ''
};
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Button: FunctionComponent<StyledButtonProps> = ({ className, selected, x, y, ...rest }) => (
  <button
    type="button"
    className={className}
    aria-label={`Point (${x}, ${y})`}
    title={`(${x}, ${y})`}
    {...rest}
  />
);

const StyledButton: StyledComponent<StyledButtonProps, StyledButtonProps, ThemeProps> = styled(
  Button
)`
  width: ${props => `${props.theme.thickness || 8}px`};
  height: ${props => `${props.theme.thickness || 8}px`};
  box-sizing: border-box;
  padding: 0;
  border: 1px solid transparent;
  background: ${props => props.theme.color || '#000'};
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
  cursor: move;
  font-size: 0;
  line-height: 0;
  ${props => (!props.theme || props.theme.shape === 'circle') && `border-radius: 50%`};
  ${props => props.selected && selectedClassName};
  ${position};
  outline: 0;
  text-indent: 100%;
`;

export const Point: FunctionComponent<PointProps> = props => (
  <ViewBoxContext.Consumer>
    {(viewBox: ViewBox) => <StyledButton {...props} {...viewBox} />}
  </ViewBoxContext.Consumer>
);

Point.defaultProps = {
  selected: false,
};
