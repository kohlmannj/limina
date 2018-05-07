import React, { Component, CSSProperties } from 'react';
import ScrollBar from '../ScrollBar';
import ScrollBarCorner from '../ScrollBarCorner';
import {
  IScaleEventHandlerOptions,
  IScrollViewProps,
  IScrollViewState,
  ReactMouseOrTouchEvent,
} from './ScrollView.d';
import { absolutelyPositioned, overflowContainer, root } from './styles';

export default class ScrollView extends Component<IScrollViewProps, IScrollViewState> {
  public static defaultProps = {
    maxScaleX: 10,
    maxScaleY: 10,
    minScaleX: 1,
    minScaleY: 1,
    scaleIncrement: 0.01,
    scaleX: 1,
    scaleY: 1,
  };

  public state: IScrollViewState = {
    dragging: false,
    progressX:
      (this.props.scaleX && this.props.scaleX !== 'auto' ? this.props.scaleX : 1) === 1 ? 0.5 : 0,
    progressY:
      (this.props.scaleY && this.props.scaleY !== 'auto' ? this.props.scaleY : 1) === 1 ? 0.5 : 0,
    scaleX: this.props.scaleX && this.props.scaleX !== 'auto' ? this.props.scaleX : 1,
    scaleY: this.props.scaleY && this.props.scaleY !== 'auto' ? this.props.scaleY : 1,
  };

  private overflowContainer?: HTMLDivElement | null;

  public componentDidMount() {
    this.startListeningToWindowEvents();
  }

  public componentWillReceiveProps(nextProps: IScrollViewProps) {
    if (nextProps.scaleX !== this.props.scaleX && typeof nextProps.scaleX === 'number') {
      this.setState({ scaleX: nextProps.scaleX });
    }

    if (nextProps.scaleY !== this.props.scaleY && typeof nextProps.scaleY === 'number') {
      this.setState({ scaleY: nextProps.scaleY });
    }

    if (
      (nextProps.scaleX === 'auto' || nextProps.scaleY === 'auto') &&
      this.props.scaleX !== 'auto' &&
      this.props.scaleY !== 'auto'
    ) {
      window.addEventListener('resize', this.onScroll);
    } else if (
      nextProps.scaleX !== 'auto' &&
      nextProps.scaleY !== 'auto' &&
      (this.props.scaleX === 'auto' || this.props.scaleY === 'auto')
    ) {
      window.removeEventListener('resize', this.onScroll);
    }
  }

  public componentDidUpdate(prevProps: IScrollViewProps, prevState: IScrollViewState) {
    const { dragging, dragAxis, progressX, progressY, scaleX, scaleY } = this.state;
    if (!this.overflowContainer) {
      return;
    }

    // While dragging: recalculate scrollLeft and scrollTop positions after scale changes
    if (dragging) {
      const { width, height } = this.overflowContainer.getBoundingClientRect();

      if (
        dragAxis === 'horizontal' &&
        scaleX !== prevState.scaleX &&
        progressX > 0 &&
        progressX < 1
      ) {
        const nextScrollLeft = (this.overflowContainer.scrollWidth - width) * progressX;
        this.overflowContainer.scrollLeft = nextScrollLeft;
      } else if (
        dragAxis === 'vertical' &&
        scaleY !== prevState.scaleY &&
        progressY > 0 &&
        progressY < 1
      ) {
        const nextScrollTop = (this.overflowContainer.scrollHeight - height) * progressY;
        this.overflowContainer.scrollTop = nextScrollTop;
      }
    }
  }

  public componentWillUnmount() {
    this.stopListeningToWindowEvents();
  }

  public render() {
    const {
      children,
      className,
      contentClassName,
      contentStyle: contentStyleProp,
      dangerouslySetInnerHTML,
      maxScaleX,
      maxScaleY,
      minScaleX,
      minScaleY,
      overflow,
      overflowX,
      overflowY,
      proportional,
      scaleIncrement,
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

    // Generate event handlers
    const onBeginScaleXStart = this.onBeginScale({ dragAxis: 'horizontal', dragPosition: 'start' });
    const onBeginScaleXEnd = this.onBeginScale({ dragAxis: 'horizontal', dragPosition: 'end' });
    const onBeginScaleYStart = this.onBeginScale({ dragAxis: 'vertical', dragPosition: 'start' });
    const onBeginScaleYEnd = this.onBeginScale({ dragAxis: 'vertical', dragPosition: 'end' });

    return (
      <div className={[className, root].filter(Boolean).join(' ')} style={style} {...rest}>
        <div
          className={overflowContainer({})}
          onScroll={this.onScroll}
          ref={e => {
            this.overflowContainer = e;
          }}
        >
          <div
            className={contentClassName}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
            style={contentStyle}
          >
            {children}
          </div>
        </div>
        <ScrollBar
          className={absolutelyPositioned}
          orientation="horizontal"
          overflow={overflowX || overflow}
          progress={progressX}
          scale={scaleX}
          thumbStartProps={{
            dragSignifier: scaleXProp !== 'auto',
            onMouseDown: onBeginScaleXStart,
            onTouchStart: onBeginScaleXStart,
          }}
          thumbMiddleProps={thumbXMiddleProps}
          thumbEndProps={{
            dragSignifier: scaleXProp !== 'auto',
            onMouseDown: onBeginScaleXEnd,
            onTouchStart: onBeginScaleXEnd,
          }}
        />
        <ScrollBar
          className={absolutelyPositioned}
          orientation="vertical"
          overflow={overflowY || overflow}
          progress={progressY}
          scale={scaleY}
          thumbStartProps={{
            dragSignifier: scaleYProp !== 'auto',
            onMouseDown: onBeginScaleYStart,
            onTouchStart: onBeginScaleYStart,
          }}
          thumbMiddleProps={thumbYMiddleProps}
          thumbEndProps={{
            dragSignifier: scaleYProp !== 'auto',
            onMouseDown: onBeginScaleYEnd,
            onTouchStart: onBeginScaleYEnd,
          }}
        />
        <ScrollBarCorner />
      </div>
    );
  }

  private onScroll = (): void => {
    if (!this.overflowContainer || this.state.dragging) {
      return;
    }

    const { width, height } = this.overflowContainer.getBoundingClientRect();
    const { scrollTop, scrollHeight, scrollLeft, scrollWidth } = this.overflowContainer;

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

  private startListeningToWindowEvents = () => {
    if (this.props.scaleX === 'auto' || this.props.scaleY === 'auto') {
      window.addEventListener('resize', this.onScroll);
    }

    if (this.overflowContainer) {
      this.onScroll();
    }
  };

  private stopListeningToWindowEvents = () => {
    if (this.props.scaleX === 'auto' || this.props.scaleY === 'auto') {
      window.removeEventListener('resize', this.onScroll);
    }

    window.removeEventListener('mousemove', this.onChangeScale);
    window.removeEventListener('mouseup', this.onEndScale);
    window.removeEventListener('touchmove', this.onChangeScale);
    window.removeEventListener('touchend', this.onEndScale);
  };

  private onBeginScale = ({ dragAxis, dragPosition }: IScaleEventHandlerOptions) => (
    e: ReactMouseOrTouchEvent<HTMLButtonElement>
  ): void => {
    const { target, touches } = e as React.TouchEvent<HTMLButtonElement>;
    const { clientX: dragBeginX, clientY: dragBeginY } = touches
      ? touches[0]
      : (e as React.MouseEvent<HTMLButtonElement>);

    const thumb: HTMLElement | null = (target as HTMLButtonElement).parentElement;
    const track: HTMLElement | null = thumb ? (thumb as HTMLDivElement).parentElement : null;

    let dragThumbLength;
    let dragTrackLength;

    if (thumb) {
      const { width, height } = thumb.getBoundingClientRect();

      if (dragAxis === 'horizontal') {
        dragThumbLength = width;
      } else if (dragAxis === 'vertical') {
        dragThumbLength = height;
      }
    }

    if (track) {
      const { width, height } = track.getBoundingClientRect();

      if (dragAxis === 'horizontal') {
        dragTrackLength = width;
      } else if (dragAxis === 'vertical') {
        dragTrackLength = height;
      }
    }

    this.setState({
      dragAxis,
      dragBeginX,
      dragBeginY,
      dragging: true,
      dragPosition,
      dragThumbLength,
      dragTrackLength,
    });

    window.addEventListener(touches ? 'touchmove' : 'mousemove', this.onChangeScale);
    window.addEventListener(touches ? 'touchend' : 'mouseup', this.onEndScale, {
      once: true,
    });
  };

  private onChangeScale = (e: MouseEvent | TouchEvent): void => {
    const { touches } = e as TouchEvent;
    const { clientX, clientY } = touches ? touches[0] : (e as MouseEvent);

    const { minScaleX, maxScaleX, minScaleY, maxScaleY, scaleIncrement } = this.props;
    const {
      dragBeginX,
      dragBeginY,
      dragAxis,
      dragPosition,
      dragThumbLength,
      dragTrackLength,
    } = this.state;

    if (!dragBeginX || !dragBeginY) {
      return;
    }

    const dX = clientX - dragBeginX;
    const dY = clientY - dragBeginY;

    let dLength;
    let minScale;
    let maxScale;

    if (dragAxis === 'horizontal') {
      dLength = dragPosition === 'start' ? -dX : dX;
      minScale = minScaleX;
      maxScale = maxScaleX;
    } else if (dragAxis === 'vertical') {
      dLength = dragPosition === 'start' ? -dY : dY;
      minScale = minScaleY;
      maxScale = maxScaleY;
    }

    const nextThumbLength = dragThumbLength && dLength && dragThumbLength + dLength;
    let nextScale =
      dragTrackLength && nextThumbLength ? dragTrackLength / nextThumbLength : undefined;

    // Round nextScale to the nearest increment
    if (nextScale && scaleIncrement) {
      nextScale = Math.round(nextScale * 1 / scaleIncrement) / (1 / scaleIncrement);
    }

    if (nextScale && minScale && maxScale && nextScale >= minScale && nextScale <= maxScale) {
      if (dragAxis === 'horizontal') {
        this.setState({ scaleX: nextScale });

        if (nextScale === 1) {
          this.setState({ progressX: 0.5 });
        }
      } else if (dragAxis === 'vertical') {
        this.setState({ scaleY: nextScale });

        if (nextScale === 1) {
          this.setState({ progressY: 0.5 });
        }
      }
    }
  };

  private onEndScale = (e: MouseEvent | TouchEvent): void => {
    const { touches } = e as TouchEvent;

    this.setState({
      dragging: false,
      dragBeginX: undefined,
      dragBeginY: undefined,
      dragAxis: undefined,
      dragPosition: undefined,
      dragThumbLength: undefined,
      dragTrackLength: undefined,
    });

    window.removeEventListener(touches ? 'touchmove' : 'mousemove', this.onChangeScale);
  };
}
