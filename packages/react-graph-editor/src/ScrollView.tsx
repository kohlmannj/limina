import React, { Component, CSSProperties } from 'react';
import styled, { css } from 'react-emotion';
import { OverflowMode } from './index';
import ScrollBar from './ScrollBar';

export interface IScrollViewProps {
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  overflow?: OverflowMode;
  overflowX?: OverflowMode;
  overflowY?: OverflowMode;
  style?: CSSProperties;
}

export interface IScrollViewState {
  progressX: number;
  progressY: number;
  scaleX: number;
  scaleY: number;
}

const ScrollBarCorner = styled('div')`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9999;
  width: ${props => props.theme.trackWidth || 15}px;
  height: ${props => props.theme.trackWidth || 15}px;
  background: ${props => props.theme.trackColor || '#efefef'};
`;

const ScrollViewContainer = styled('div')`
  position: relative;
  overflow: hidden;
`;

const ScrollViewOverflowContainer = styled('div')`
  width: ${props =>
    `calc(100% - ${
      props.theme && typeof props.theme.trackWidth === 'number' ? props.theme.trackWidth : 15
    }px)`};
  height: ${props =>
    `calc(100% - ${
      props.theme && typeof props.theme.trackWidth === 'number' ? props.theme.trackWidth : 15
    }px)`};
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
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
          className={css`
            position: absolute;
            z-index: 1;
          `}
          orientation="horizontal"
          overflow={overflowX || overflow}
          progress={progressX}
          scale={scaleX}
        />
        <ScrollBar
          className={css`
            position: absolute;
            z-index: 1;
          `}
          orientation="vertical"
          overflow={overflowY || overflow}
          progress={progressY}
          scale={scaleY}
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
