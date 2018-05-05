import React, { CSSProperties, SFC } from 'react';
import { OverflowMode, ScrollBarOrientation } from '../..';
import { IScrollBarTheme } from '../../theme';
import ThumbContainer from './components/ThumbContainer';
import ThumbSegment, { IThumbSegmentProps } from './components/ThumbSegment';
import Track from './components/Track';

export interface IScrollBarProps {
  className?: string;
  orientation?: ScrollBarOrientation;
  overflow?: OverflowMode;
  progress?: number;
  scale?: number;
  style?: CSSProperties;
  thumbStartProps?: IThumbSegmentProps;
  thumbMiddleProps?: IThumbSegmentProps;
  thumbEndProps?: IThumbSegmentProps;
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
  thumbEndProps,
  thumbMiddleProps,
  thumbStartProps,
}) => (
  <Track className={className} orientation={orientation} progress={progress} style={style}>
    {typeof scale !== 'undefined' &&
      (scale > 1 || (scale <= 1 && overflow === 'scroll')) && (
        <ThumbContainer orientation={orientation} progress={progress} scale={scale}>
          <ThumbSegment
            dragSignifier
            position="start"
            orientation={orientation}
            {...thumbStartProps}
          />
          <ThumbSegment position="middle" orientation={orientation} {...thumbMiddleProps} />
          <ThumbSegment dragSignifier position="end" orientation={orientation} {...thumbEndProps} />
        </ThumbContainer>
      )}
  </Track>
);

ScrollBar.defaultProps = {
  orientation: 'vertical',
  overflow: 'auto',
  scale: 1,
};

export default ScrollBar;
