import React, { CSSProperties, SFC } from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { OverflowMode, ScrollBarOrientation } from '../..';
import { IScrollBarTheme } from '../../theme';
import Thumb from './components/Thumb';
import ThumbContainer from './components/ThumbContainer';
import Track from './components/Track';

export interface IScrollBarProps {
  className?: string;
  orientation?: ScrollBarOrientation;
  overflow?: OverflowMode;
  progress?: number;
  scale?: number;
  style?: CSSProperties;
}

export interface IStyledScrollBarProps extends IScrollBarProps {
  theme?: Partial<IScrollBarTheme>;
}

export const ScrollBar: SFC<IScrollBarProps> = ({
  className,
  orientation,
  overflow,
  progress,
  scale,
  style,
}) => (
  <Track className={className} orientation={orientation} progress={progress} style={style}>
    <ThumbContainer orientation={orientation} progress={progress} scale={scale}>
      {typeof scale === 'number' &&
        (scale > 1 || (scale <= 1 && overflow === 'scroll')) && <Thumb orientation={orientation} />}
    </ThumbContainer>
  </Track>
);

ScrollBar.defaultProps = {
  orientation: 'vertical',
  overflow: 'auto',
  scale: 1,
};

export default ScrollBar;
