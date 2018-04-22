import React, { SFC } from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { IThemeProps, PointTuple } from '../../index.d';

export interface IPointProps {
  className?: string;
  selected?: boolean;
  theme?: IThemeProps;
  x: number;
  y: number;
}

export const Point: SFC<IPointProps> = ({ className, x, y, ...rest }) => (
  <button aria-label={`coordinate ${x}, ${y}`} className={className} {...rest} />
);

const shape = (props: IPointProps) => {
  switch (props.theme!.shape) {
    case 'diamond':
      return css`
        transform: rotate(45deg);
      `;
    case 'square':
      return undefined;
    default:
    case 'circle':
      return css`
        border-radius: 50%;
      `;
  }
};

const selected = (props: IPointProps) => css`
  box-shadow: 0 0 5px 2px rgb(59, 153, 252);
  background: #fff;
  border-color: ${props.theme!.color || '#000'};

  &::after {
    content: '';
  }
`;

const StyledPoint: StyledComponent<IPointProps, IThemeProps, {}> = styled(Point)`
  background: ${props => props.theme.color || '#000'};
  border: 0;
  box-sizing: border-box;
  font-size: 0;
  line-height: 0;
  text-indent: 100%;
  overflow: hidden;
  border: 1px solid transparent;
  height: ${props => `${props.theme.thickness || 8}px`};
  padding: 0;
  outline: 0;
  width: ${props => `${props.theme.thickness || 8}px`};
  ${props => props.selected && selected};
  ${shape};
`;

StyledPoint.defaultProps = {
  selected: false,
};

export default StyledPoint;
