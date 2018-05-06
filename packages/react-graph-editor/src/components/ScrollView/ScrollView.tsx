import React, { Component, CSSProperties } from 'react';
import styled, { css } from 'react-emotion';
import { OverflowMode } from '../..';
import ScrollBar from '../ScrollBar';
import { IStyledThumbSegmentProps } from '../ScrollBar/components/ThumbSegment';
import ScrollBarCorner from '../ScrollBarCorner';
import ScrollViewOverflowWrapper from './components/ScrollViewOverflowContainer';

export interface IScrollViewProps {
  className?: string;
  contentClassName?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  overflow?: OverflowMode;
  overflowX?: OverflowMode;
  overflowY?: OverflowMode;
  scaleX?: number;
  scaleY?: number;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  thumbXStartProps?: Partial<IStyledThumbSegmentProps>;
  thumbXMiddleProps?: Partial<IStyledThumbSegmentProps>;
  thumbXEndProps?: Partial<IStyledThumbSegmentProps>;
  thumbYStartProps?: Partial<IStyledThumbSegmentProps>;
  thumbYMiddleProps?: Partial<IStyledThumbSegmentProps>;
  thumbYEndProps?: Partial<IStyledThumbSegmentProps>;
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
    scaleX: this.props.scaleX || 1,
    scaleY: this.props.scaleY || 1,
  };

  private content?: HTMLDivElement | null;

  public componentDidMount() {
    this.startListening();
  }

  public componentWillReceiveProps(nextProps: IScrollViewProps) {
    if (nextProps.scaleX !== this.props.scaleX && typeof nextProps.scaleX !== 'undefined') {
      this.setState({ scaleX: nextProps.scaleX });
    }

    if (nextProps.scaleY !== this.props.scaleY && typeof nextProps.scaleY !== 'undefined') {
      this.setState({ scaleY: nextProps.scaleY });
    }
  }

  public componentWillUnmount() {
    this.stopListening();
  }

  public render() {
    const {
      children,
      className,
      contentClassName,
      contentStyle,
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
          thumbStartProps={thumbYStartProps}
          thumbMiddleProps={thumbYMiddleProps}
          thumbEndProps={thumbYEndProps}
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

    if (typeof this.props.scaleX === 'undefined') {
      this.setState({
        scaleX: Math.max(scrollWidth / Math.round(width), 1),
      });
    }

    if (typeof this.props.scaleY === 'undefined') {
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
}
