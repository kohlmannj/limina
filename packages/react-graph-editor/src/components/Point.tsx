import React, { CSSProperties, SFC } from 'react';
import styled, { css, cx, StyledComponent } from 'react-emotion';
import { IThemeProps, IViewBox, OriginDirection, PointShape, PointTuple } from '../index';
import ViewBoxContext from './ViewBoxContext';

export interface IPointProps {
  className?: string;
  selected?: boolean;
  theme?: Partial<IThemeProps>;
  x: number;
  y: number;
}

export interface IStyledButtonProps extends IPointProps, IViewBox {}

const getOriginTranslateFactor = (origin: OriginDirection) =>
  origin === 'left' || origin === 'top' ? -0.5 : 0.5;

export type DynamicStyle = (props: IPointProps) => string;

export const shapes: Record<PointShape, DynamicStyle> = {
  circle: () => css`
    border-radius: 50%;
  `,
  diamond: () => '',
  square: () => '',
};

const selectedClassName = (props: IPointProps) => css`
  background: #fff;
  border-color: ${props.theme && props.theme.color ? props.theme.color : '#000'};
  box-shadow: 0 0 5px 2px rgba(59, 153, 252, 0.75);
`;

const translate = (props: IStyledButtonProps) =>
  props.originX && props.originY
    ? `translate(${getOriginTranslateFactor(props.originX) * 100}%, ${getOriginTranslateFactor(
        props.originY
      ) * 100}%)`
    : '';

const position = (props: IStyledButtonProps) => css`
  position: absolute;
  ${props.originX && `${props.originX}: ${(props.x - props.minX) / props.width * 100}%;`}
  ${props.originY && `${props.originY}: ${(props.y - props.minY) / props.height * 100}%;`}
  transform: ${translate(props)} ${
  props.theme && props.theme.shape === 'diamond' ? 'rotate(45deg)' : ''
};
`;

const Button: SFC<IStyledButtonProps> = ({ className, selected, x, y, ...rest }) => (
  <button
    className={className}
    aria-label={`Point (${x}, ${y})`}
    title={`(${x}, ${y})`}
    {...rest}
  />
);

const StyledButton: StyledComponent<IStyledButtonProps, IThemeProps, {}> = styled(Button)`
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

export const Point: SFC<IPointProps> = props => {
  return (
    <ViewBoxContext.Consumer>
      {(viewBox: IViewBox) => <StyledButton {...props} {...viewBox} />}
    </ViewBoxContext.Consumer>
  );
};

Point.defaultProps = {
  selected: false,
};

export default Point;
