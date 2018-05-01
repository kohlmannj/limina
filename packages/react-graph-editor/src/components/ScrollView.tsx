import React, { Component, CSSProperties } from 'react';
import styled, { css } from 'react-emotion';
import { OverflowMode } from '..';
import { defaultTheme } from '../theme';
import ScrollBar from './ScrollBar';
import { IThumbSegmentProps } from './ScrollBar/components/ThumbSegment';
import ScrollBarCorner from './ScrollBarCorner';

export interface IScrollViewProps {
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  overflow?: OverflowMode;
  overflowX?: OverflowMode;
  overflowY?: OverflowMode;
  style?: CSSProperties;
  thumbXStartProps?: IThumbSegmentProps;
  thumbXMiddleProps?: IThumbSegmentProps;
  thumbXEndProps?: IThumbSegmentProps;
  thumbYStartProps?: IThumbSegmentProps;
  thumbYMiddleProps?: IThumbSegmentProps;
  thumbYEndProps?: IThumbSegmentProps;
}

export interface IScrollViewState {
  progressX: number;
  progressY: number;
  scaleX: number;
  scaleY: number;
}

const ScrollViewContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const ScrollViewOverflowContainer = styled.div`
  overflow: auto;
  width: ${props =>
    `calc(100% - ${
      props.theme && typeof props.theme.trackWidth !== 'undefined'
        ? props.theme.trackWidth
        : defaultTheme.trackWidth
    }px)`};
  height: ${props =>
    `calc(100% - ${
      props.theme && typeof props.theme.trackWidth !== 'undefined'
        ? props.theme.trackWidth
        : defaultTheme.trackWidth
    }px)`};

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const absolutelyPositioned = css`
  position: absolute;
  z-index: 1;
`;

export default class ScrollView extends Component<IScrollViewProps, IScrollViewState> {
  public state: IScrollViewState = {
    progressX: 0,
    progressY: 0,
    scaleX: 1,
    scaleY: 1,
  };

  private root?: HTMLDivElement | null;

  private content?: HTMLDivElement | null;

  public componentDidMount() {
    this.startListening();
  }

  public componentWillUnmount() {
    this.stopListening();
  }

  public render() {
    const {
      children,
      className,
      dangerouslySetInnerHTML,
      overflow,
      overflowX,
      overflowY,
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

    return (
      <ScrollViewContainer
        innerRef={e => {
          this.root = e;
        }}
        className={className}
        style={style}
        {...rest}
      >
        <ScrollViewOverflowContainer
          innerRef={e => {
            this.content = e;
          }}
          dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >
          {children}
        </ScrollViewOverflowContainer>
        <ScrollBar
          className={absolutelyPositioned}
          orientation="horizontal"
          overflow={overflowX || overflow}
          progress={progressX}
          scale={scaleX}
          thumbStartProps={thumbXStartProps}
          thumbMiddleProps={thumbXMiddleProps}
          thumbEndProps={thumbXEndProps}
        />
        <ScrollBar
          className={absolutelyPositioned}
          orientation="vertical"
          overflow={overflowY || overflow}
          progress={progressY}
          scale={scaleY}
          thumbStartProps={thumbXStartProps}
          thumbMiddleProps={thumbXMiddleProps}
          thumbEndProps={thumbXEndProps}
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

    this.setState({
      progressX: scrollLeft / (scrollWidth - width),
      progressY: scrollTop / (scrollHeight - height),
      scaleX: Math.max(scrollWidth / Math.round(width), 1),
      scaleY: Math.max(scrollHeight / Math.round(height), 1),
    });
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
}
