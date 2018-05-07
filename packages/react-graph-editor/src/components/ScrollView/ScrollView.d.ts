import React, { CSSProperties } from 'react';
import { OverflowMode, ScrollBarAxis } from '../..';
import {
  IStyledThumbSegmentProps,
  ThumbSegmentPosition,
} from '../ScrollBar/components/ThumbSegment';

export type DragType = 'progress' | 'scale';

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
  scaleIncrement?: number;
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
  dragAxis?: ScrollBarAxis;
  dragBeginX?: number;
  dragBeginY?: number;
  dragPosition?: ThumbSegmentPosition;
  dragThumbLength?: number;
  dragTrackLength?: number;
  dragType?: DragType;
  progressX: number;
  progressY: number;
  scaleX: number;
  scaleY: number;
}

export interface IScaleEventHandlerOptions {
  axis: ScrollBarAxis;
  pos: ThumbSegmentPosition;
  type: DragType;
}

// export type MouseOrTouchEventListener = (event: MouseEvent | TouchEvent) => void;

export type ReactMouseOrTouchEvent<E> = React.MouseEvent<E> | React.TouchEvent<E>;
