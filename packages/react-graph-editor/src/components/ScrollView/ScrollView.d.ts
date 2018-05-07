import React, { CSSProperties } from 'react';
import { OverflowMode, ScrollBarOrientation } from '../..';
import {
  IStyledThumbSegmentProps,
  ThumbSegmentPosition,
} from '../ScrollBar/components/ThumbSegment';

export interface IScrollViewProps {
  className?: string;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  maxScaleX?: number;
  maxScaleY?: number;
  minScaleX?: number;
  minScaleY?: number;
  overflow?: OverflowMode;
  overflowX?: OverflowMode;
  overflowY?: OverflowMode;
  proportional?: boolean;
  scaleX?: number | 'auto';
  scaleY?: number | 'auto';
  style?: CSSProperties;
  thumbXEndProps?: Partial<IStyledThumbSegmentProps>;
  thumbXMiddleProps?: Partial<IStyledThumbSegmentProps>;
  thumbXStartProps?: Partial<IStyledThumbSegmentProps>;
  thumbYEndProps?: Partial<IStyledThumbSegmentProps>;
  thumbYMiddleProps?: Partial<IStyledThumbSegmentProps>;
  thumbYStartProps?: Partial<IStyledThumbSegmentProps>;
}

export interface IScrollViewState {
  dragging: boolean;
  dragBeginX?: number;
  dragBeginY?: number;
  dragAxis?: ScrollBarOrientation;
  dragPosition?: ThumbSegmentPosition;
  dragThumbLength?: number;
  dragTrackLength?: number;
  progressX: number;
  progressY: number;
  scaleX: number;
  scaleY: number;
}

export interface IScaleEventHandlerOptions {
  dragAxis: ScrollBarOrientation;
  dragPosition: ThumbSegmentPosition;
}

// export type MouseOrTouchEventListener = (event: MouseEvent | TouchEvent) => void;

export type ReactMouseOrTouchEvent<E> = React.MouseEvent<E> | React.TouchEvent<E>;
