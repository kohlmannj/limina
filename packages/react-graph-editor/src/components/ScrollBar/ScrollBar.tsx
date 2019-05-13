/** @jsx jsx */
import { jsx } from '@emotion/core';
import { CSSProperties, FunctionComponent } from 'react';
import { ScrollBarTheme } from '../../scrollBarTheme';
import { ThumbContainer } from './components/ThumbContainer';
import { ThumbSegment, StyledThumbSegmentProps } from './components/ThumbSegment';
import { Track } from './components/Track';
import { OverflowMode, ScrollBarAxis } from '../..';

export interface ScrollBarProps {
  axis?: ScrollBarAxis;
  className?: string;
  overflow?: OverflowMode;
  progress?: number;
  scale?: number;
  style?: CSSProperties;
  thumbEndProps?: Partial<StyledThumbSegmentProps>;
  thumbMiddleProps?: Partial<StyledThumbSegmentProps>;
  thumbStartProps?: Partial<StyledThumbSegmentProps>;
}

export interface StyledScrollBarProps extends ScrollBarProps {
  theme?: Partial<ScrollBarTheme>;
}

export const ScrollBar: FunctionComponent<ScrollBarProps> = ({
  axis = 'y',
  className,
  overflow = 'scroll',
  progress,
  scale = 1,
  style,
  thumbEndProps,
  thumbMiddleProps,
  thumbStartProps,
}) => (
  <Track className={className} axis={axis} progress={progress} style={style}>
    {typeof scale !== 'undefined' && (scale > 1 || (scale <= 1 && overflow === 'scroll')) && (
      <ThumbContainer axis={axis} progress={progress} scale={scale}>
        <ThumbSegment dragSignifier axis={axis} position="start" {...thumbStartProps} />
        <ThumbSegment axis={axis} position="middle" {...thumbMiddleProps} />
        <ThumbSegment dragSignifier axis={axis} position="end" {...thumbEndProps} />
      </ThumbContainer>
    )}
  </Track>
);
