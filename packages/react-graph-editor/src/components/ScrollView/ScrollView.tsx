import React, { Component, CSSProperties } from 'react';
import styled, { css } from 'react-emotion';
import { OverflowMode, ScrollBarOrientation } from '../..';
import ScrollBar from '../ScrollBar';
import {
  IStyledThumbSegmentProps,
  ThumbSegmentPosition,
} from '../ScrollBar/components/ThumbSegment';
import ScrollBarCorner from '../ScrollBarCorner';
import ScrollViewOverflowWrapper from './components/ScrollViewOverflowContainer';

export interface IScrollViewProps {
  className?: string;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
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
  dragMouseStartX?: number;
  dragMouseStartY?: number;
  dragOrientation?: ScrollBarOrientation;
  dragPosition?: ThumbSegmentPosition;
  dragThumbLength?: number;
  dragTrackLength?: number;
  progressX: number;
  progressY: number;
  scaleX: number;
  scaleY: number;
}

export interface IScaleEventHandlerOptions {
  dragOrientation: ScrollBarOrientation;
  dragPosition: ThumbSegmentPosition;
}

export type MouseEventListener = (event: MouseEvent) => void;

const ScrollViewContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

export const absolutelyPositioned = css`
  position: absolute;
  z-index: 1;
`;

export default class ScrollView extends Component<IScrollViewProps, IScrollViewState> {
  public static defaultProps = {
    scaleX: 1,
    scaleY: 1,
  };

  public state: IScrollViewState = {
    progressX: 0,
    progressY: 0,
    scaleX: this.props.scaleX && this.props.scaleX !== 'auto' ? this.props.scaleX : 1,
    scaleY: this.props.scaleY && this.props.scaleY !== 'auto' ? this.props.scaleY : 1,
  };

  private content?: HTMLDivElement | null;

  public componentDidMount() {
    this.startListening();
  }

  public componentWillReceiveProps(nextProps: IScrollViewProps) {
    if (nextProps.scaleX !== this.props.scaleX && typeof nextProps.scaleX === 'number') {
      this.setState({ scaleX: nextProps.scaleX });
    }

    if (nextProps.scaleY !== this.props.scaleY && typeof nextProps.scaleY === 'number') {
      this.setState({ scaleY: nextProps.scaleY });
    }
  }

  public componentWillUnmount() {
    this.stopListening();

    window.removeEventListener('mousemove', this.onChangeScale);
    window.removeEventListener('mouseup', this.onStopScale);
  }

  public render() {
    const {
      children,
      className,
      contentClassName,
      contentStyle: contentStyleProp,
      dangerouslySetInnerHTML,
      overflow,
      overflowX,
      overflowY,
      proportional,
      scaleX: scaleXProp,
      scaleY: scaleYProp,
      style,
      thumbXStartProps,
      thumbXMiddleProps,
      thumbXEndProps,
      thumbYStartProps,
      thumbYMiddleProps,
      thumbYEndProps,
      ...rest
    } = this.props;
    const { progressX, progressY, scaleX, scaleY } = this.state;

    const contentStyle: CSSProperties = { ...contentStyleProp };

    if (scaleXProp !== 'auto') {
      contentStyle.width = `${scaleX * 100}%`;
    }
    if (scaleYProp !== 'auto') {
      contentStyle.height = `${scaleY * 100}%`;
    }

    return (
      <ScrollViewContainer className={className} style={style} {...rest}>
        <ScrollViewOverflowWrapper
          innerRef={e => {
            this.content = e;
          }}
        >
          <div
            className={contentClassName}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
            style={contentStyle}
          >
            {children}
          </div>
        </ScrollViewOverflowWrapper>
        <ScrollBar
          className={absolutelyPositioned}
          orientation="horizontal"
          overflow={overflowX || overflow}
          progress={progressX}
          scale={scaleX}
          thumbStartProps={{
            dragSignifier: scaleXProp !== 'auto',
            onMouseDown: this.onStartScale({
              dragOrientation: 'horizontal',
              dragPosition: 'start',
            }),
          }}
          thumbMiddleProps={thumbXMiddleProps}
          thumbEndProps={{
            dragSignifier: scaleXProp !== 'auto',
            onMouseDown: this.onStartScale({ dragOrientation: 'horizontal', dragPosition: 'end' }),
          }}
        />
        <ScrollBar
          className={absolutelyPositioned}
          orientation="vertical"
          overflow={overflowY || overflow}
          progress={progressY}
          scale={scaleY}
          thumbStartProps={{
            // dragSignifier: scaleYProp !== 'auto',
            onMouseDown: this.onStartScale({ dragOrientation: 'vertical', dragPosition: 'start' }),
          }}
          thumbMiddleProps={thumbYMiddleProps}
          thumbEndProps={{
            // dragSignifier: scaleYProp !== 'auto',
            onMouseDown: this.onStartScale({ dragOrientation: 'vertical', dragPosition: 'end' }),
          }}
        />
        <ScrollBarCorner />
      </ScrollViewContainer>
    );
  }

  private onScroll = (): void => {
    if (!this.content) {
      return;
    }

    const { width, height } = this.content.getBoundingClientRect();
    const { scrollTop, scrollHeight, scrollLeft, scrollWidth } = this.content;

    const progressX = scrollLeft / (scrollWidth - width);
    const progressY = scrollTop / (scrollHeight - height);

    if (!isNaN(progressX)) {
      this.setState({ progressX });
    }

    if (!isNaN(progressY)) {
      this.setState({ progressY });
    }

    if (this.props.scaleX === 'auto') {
      this.setState({
        scaleX: Math.max(scrollWidth / Math.round(width), 1),
      });
    }

    if (this.props.scaleY === 'auto') {
      this.setState({
        scaleY: Math.max(scrollHeight / Math.round(height), 1),
      });
    }
  };

  private startListening = () => {
    if (this.content) {
      this.content.addEventListener('scroll', this.onScroll);
      this.content.addEventListener('resize', this.onScroll);
      this.onScroll();
    }
  };

  private stopListening = () => {
    if (this.content) {
      this.content.removeEventListener('scroll', this.onScroll);
      this.content.removeEventListener('resize', this.onScroll);
    }
  };

  private onStartScale = ({ dragOrientation, dragPosition }: IScaleEventHandlerOptions) => ({
    clientX: dragMouseStartX,
    clientY: dragMouseStartY,
    target,
  }: React.MouseEvent<HTMLButtonElement>): void => {
    const thumb: HTMLElement | null = (target as HTMLButtonElement).parentElement;
    const track: HTMLElement | null = thumb ? (thumb as HTMLDivElement).parentElement : null;

    let dragThumbLength;
    let dragTrackLength;

    if (thumb) {
      const { width, height } = thumb.getBoundingClientRect();

      if (dragOrientation === 'horizontal') {
        dragThumbLength = width;
      } else if (dragOrientation === 'vertical') {
        dragThumbLength = height;
      }
    }

    if (track) {
      const { width, height } = track.getBoundingClientRect();

      if (dragOrientation === 'horizontal') {
        dragTrackLength = width;
      } else if (dragOrientation === 'vertical') {
        dragTrackLength = height;
      }
    }

    this.setState({
      dragMouseStartX,
      dragMouseStartY,
      dragOrientation,
      dragPosition,
      dragThumbLength,
      dragTrackLength,
    });

    window.addEventListener('mousemove', this.onChangeScale);
    window.addEventListener('mouseup', this.onStopScale, {
      once: true,
    });
  };

  private onChangeScale = (e: MouseEvent): void => {
    const {
      dragMouseStartX,
      dragMouseStartY,
      dragOrientation,
      dragPosition,
      dragThumbLength,
      dragTrackLength,
    } = this.state;

    const dX = e.clientX - dragMouseStartX!;
    const dY = e.clientY - dragMouseStartY!;

    let dLength;

    if (dragOrientation === 'horizontal') {
      dLength = dragPosition === 'start' ? -dX : dX;
    } else if (dragOrientation === 'vertical') {
      dLength = dragPosition === 'start' ? -dY : dY;
    }

    const nextThumbLength = dragThumbLength && dLength && dragThumbLength + dLength;
    const rawNextScale =
      dragTrackLength && nextThumbLength ? dragTrackLength / nextThumbLength : undefined;
    const nextScale = Math.min(Math.max(rawNextScale || 1, 1), 10);

    if (dragOrientation === 'horizontal') {
      this.setState({ scaleX: nextScale });
    } else if (dragOrientation === 'vertical') {
      this.setState({ scaleY: nextScale });
    }
  };

  private onStopScale = (e: MouseEvent): void => {
    this.setState({
      dragMouseStartX: undefined,
      dragMouseStartY: undefined,
      dragOrientation: undefined,
      dragPosition: undefined,
      dragThumbLength: undefined,
      dragTrackLength: undefined,
    });

    window.removeEventListener('mousemove', this.onChangeScale);
  };
}
