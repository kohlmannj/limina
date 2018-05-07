import React, { CSSProperties, SFC } from 'react';
import { OverflowMode, ScrollBarAxis } from '../..';
import { IScrollBarTheme } from '../../theme';
import ThumbContainer from './components/ThumbContainer';
import ThumbSegment, { IStyledThumbSegmentProps } from './components/ThumbSegment';
import Track from './components/Track';

export interface IScrollBarProps {
  axis?: ScrollBarAxis;
  className?: string;
  overflow?: OverflowMode;
  progress?: number;
  scale?: number;
  style?: CSSProperties;
  thumbEndProps?: Partial<IStyledThumbSegmentProps>;
  thumbMiddleProps?: Partial<IStyledThumbSegmentProps>;
  thumbStartProps?: Partial<IStyledThumbSegmentProps>;
}

export interface IStyledScrollBarProps extends IScrollBarProps {
  theme?: Partial<IScrollBarTheme>;
}

export const ScrollBar: SFC<IScrollBarProps> = ({
  axis,
  className,
  overflow,
  progress,
  scale,
  style,
  thumbEndProps,
  thumbMiddleProps,
  thumbStartProps,
}) => (
  <Track className={className} axis={axis} progress={progress} style={style}>
    {typeof scale !== 'undefined' &&
      (scale > 1 || (scale <= 1 && overflow === 'scroll')) && (
        <ThumbContainer axis={axis} progress={progress} scale={scale}>
          <ThumbSegment dragSignifier axis={axis} position="start" {...thumbStartProps} />
          <ThumbSegment axis={axis} position="middle" {...thumbMiddleProps} />
          <ThumbSegment dragSignifier axis={axis} position="end" {...thumbEndProps} />
        </ThumbContainer>
      )}
  </Track>
);

ScrollBar.defaultProps = {
  axis: 'y',
  overflow: 'scroll',
  scale: 1,
};

export default ScrollBar;
