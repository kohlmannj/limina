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
import { getNormalizedDragEventData } from './utils';

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

  public static getDerivedStateFromProps(nextProps: IScrollViewProps, prevState: IScrollViewState) {
    if (nextProps.scaleX !== prevState.scaleX && typeof nextProps.scaleX === 'number') {
      return { scaleX: nextProps.scaleX };
    }

    if (nextProps.scaleY !== prevState.scaleY && typeof nextProps.scaleY === 'number') {
      return { scaleY: nextProps.scaleY };
    }

    return null;
  }

  public state: IScrollViewState = {
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

  public componentDidUpdate(prevProps: IScrollViewProps, prevState: IScrollViewState) {
    const { dragAxis, dragType, progressX, progressY, scaleX, scaleY } = this.state;

    if (!this.overflowContainer) {
      return;
    }

    // While dragging: recalculate scrollLeft and scrollTop positions after scale changes
    if (dragType) {
      const { width, height } = this.overflowContainer.getBoundingClientRect();

      if (
        dragAxis === 'x' &&
        (scaleX !== prevState.scaleX || progressX !== prevState.progressX) &&
        progressX > 0 &&
        progressX < 1
      ) {
        const nextScrollLeft = (this.overflowContainer.scrollWidth - width) * progressX;
        this.overflowContainer.scrollLeft = nextScrollLeft;
      } else if (
        dragAxis === 'y' &&
        (scaleY !== prevState.scaleY || progressY !== prevState.progressY) &&
        progressY > 0 &&
        progressY < 1
      ) {
        const nextScrollTop = (this.overflowContainer.scrollHeight - height) * progressY;
        this.overflowContainer.scrollTop = nextScrollTop;
      }
    }

    if (
      (this.props.scaleX === 'auto' || this.props.scaleY === 'auto') &&
      prevProps.scaleX !== 'auto' &&
      prevProps.scaleY !== 'auto'
    ) {
      window.addEventListener('resize', this.onScroll);
    } else if (
      this.props.scaleX !== 'auto' &&
      this.props.scaleY !== 'auto' &&
      (prevProps.scaleX === 'auto' || prevProps.scaleY === 'auto')
    ) {
      window.removeEventListener('resize', this.onScroll);
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
    const onBeginDragXSrt = this.onBeginDrag({ axis: 'x', pos: 'start', type: 'scale' });
    const onBeginDragXMid = this.onBeginDrag({ axis: 'x', pos: 'middle', type: 'progress' });
    const onBeginDragXEnd = this.onBeginDrag({ axis: 'x', pos: 'end', type: 'scale' });
    const onBeginDragYSrt = this.onBeginDrag({ axis: 'y', pos: 'start', type: 'scale' });
    const onBeginDragYMid = this.onBeginDrag({ axis: 'y', pos: 'middle', type: 'progress' });
    const onBeginDragYEnd = this.onBeginDrag({ axis: 'y', pos: 'end', type: 'scale' });

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
          axis="x"
          className={absolutelyPositioned}
          overflow={overflowX || overflow}
          progress={progressX}
          scale={scaleX}
          thumbStartProps={{
            dragSignifier: scaleXProp !== 'auto',
            onMouseDown: onBeginDragXSrt,
            onTouchStart: onBeginDragXSrt,
          }}
          thumbMiddleProps={{
            onMouseDown: onBeginDragXMid,
            onTouchStart: onBeginDragXMid,
          }}
          thumbEndProps={{
            dragSignifier: scaleXProp !== 'auto',
            onMouseDown: onBeginDragXEnd,
            onTouchStart: onBeginDragXEnd,
          }}
        />
        <ScrollBar
          axis="y"
          className={absolutelyPositioned}
          overflow={overflowY || overflow}
          progress={progressY}
          scale={scaleY}
          thumbStartProps={{
            dragSignifier: scaleYProp !== 'auto',
            onMouseDown: onBeginDragYSrt,
            onTouchStart: onBeginDragYSrt,
          }}
          thumbMiddleProps={{
            onMouseDown: onBeginDragYMid,
            onTouchStart: onBeginDragYMid,
          }}
          thumbEndProps={{
            dragSignifier: scaleYProp !== 'auto',
            onMouseDown: onBeginDragYEnd,
            onTouchStart: onBeginDragYEnd,
          }}
        />
        <ScrollBarCorner />
      </div>
    );
  }

  private onScroll = (): void => {
    if (!this.overflowContainer || typeof this.state.dragType !== 'undefined') {
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

    if (typeof this.state.dragType !== 'undefined') {
      window.removeEventListener('mousemove', this.onMoveDrag);
      window.removeEventListener('mouseup', this.onEndDrag);
      window.removeEventListener('touchmove', this.onMoveDrag);
      window.removeEventListener('touchend', this.onEndDrag);
    }
  };

  private onBeginDrag = ({
    axis: dragAxis,
    pos: dragPosition,
    type: dragType,
  }: IScaleEventHandlerOptions) => (e: ReactMouseOrTouchEvent<HTMLButtonElement>): void => {
    const { progressX, progressY } = this.state;

    const {
      clientX: dragBeginX,
      clientY: dragBeginY,
      thumbLength: dragThumbLength,
      touches,
      trackLength: dragTrackLength,
    } = getNormalizedDragEventData(e, dragAxis);

    let dragStartProgress;

    if (dragAxis === 'x') {
      dragStartProgress = progressX;
    } else if (dragAxis === 'y') {
      dragStartProgress = progressY;
    }

    this.setState({
      dragAxis,
      dragBeginX,
      dragBeginY,
      dragPosition,
      dragStartProgress,
      dragThumbLength,
      dragTrackLength,
      dragType,
    });

    window.addEventListener(touches ? 'touchmove' : 'mousemove', this.onMoveDrag);
    window.addEventListener(touches ? 'touchend' : 'mouseup', this.onEndDrag, {
      once: true,
    });
  };

  private onMoveDrag = (e: MouseEvent | TouchEvent): void => {
    const { minScaleX, maxScaleX, minScaleY, maxScaleY, scaleIncrement } = this.props;
    const {
      dragBeginX,
      dragBeginY,
      dragAxis,
      dragPosition,
      dragStartProgress,
      dragThumbLength,
      dragTrackLength,
      dragType,
      progressX,
      progressY,
      scaleX,
      scaleY,
    } = this.state;

    if (!dragBeginX || !dragBeginY || !dragAxis) {
      return;
    }

    const { clientX, clientY, trackLength } = getNormalizedDragEventData(e, dragAxis);

    const dX = clientX - dragBeginX;
    const dY = clientY - dragBeginY;

    // Figure out which axis we're constrained to
    let currentProgress;
    let currentScale;
    let dLength;
    let minScale;
    let maxScale;

    if (dragAxis === 'x') {
      currentProgress = progressX;
      currentScale = scaleX;
      dLength = dragPosition === 'start' ? -dX : dX;
      minScale = minScaleX;
      maxScale = maxScaleX;
    } else if (dragAxis === 'y') {
      currentProgress = progressY;
      currentScale = scaleY;
      dLength = dragPosition === 'start' ? -dY : dY;
      minScale = minScaleY;
      maxScale = maxScaleY;
    }

    // Calculate length scale factor
    let dLengthScaleFactor = 1;

    if (typeof currentProgress !== 'undefined' && currentProgress > 0 && currentProgress < 1) {
      if (dragPosition === 'start') {
        dLengthScaleFactor = 1 / currentProgress;
      } else if (dragPosition === 'end') {
        dLengthScaleFactor = 1 / (1 - currentProgress);
      }
    }

    // Scaling Mode
    if (
      dragType === 'scale' &&
      typeof dragThumbLength !== 'undefined' &&
      typeof dLength !== 'undefined' &&
      typeof dLengthScaleFactor !== 'undefined' &&
      typeof dragTrackLength !== 'undefined' &&
      typeof minScale !== 'undefined' &&
      typeof maxScale !== 'undefined'
    ) {
      const nextThumbLength = dragThumbLength + dLength * dLengthScaleFactor;

      let nextScale = dragTrackLength / nextThumbLength;
      // Round nextScale to the nearest increment
      if (typeof scaleIncrement !== 'undefined') {
        nextScale = Math.round(nextScale * 1 / scaleIncrement) / (1 / scaleIncrement);
      }

      if (nextScale >= minScale && nextScale <= maxScale) {
        if (dragAxis === 'x') {
          this.setState({ scaleX: nextScale });
        } else if (dragAxis === 'y') {
          this.setState({ scaleY: nextScale });
        }
      }
    }
    // Progress Mode
    else if (
      dragType === 'progress' &&
      typeof dLength !== 'undefined' &&
      typeof dragStartProgress !== 'undefined' &&
      typeof currentScale !== 'undefined' &&
      currentScale > 1
    ) {
      const rawNextProgress = (dragStartProgress * trackLength + dLength) / trackLength;
      const nextProgress = Math.min(Math.max(rawNextProgress || 0, 0), 1);

      if (dragAxis === 'x') {
        this.setState({ progressX: nextProgress });
      } else if (dragAxis === 'y') {
        this.setState({ progressY: nextProgress });
      }
    }
  };

  private onEndDrag = (e: MouseEvent | TouchEvent): void => {
    const { touches } = e as TouchEvent;
    const { dragType, scaleX, scaleY } = this.state;

    if (dragType === 'scale') {
      if (scaleX === 1) {
        this.setState({ progressX: 0.5 });
      }

      if (scaleY === 1) {
        this.setState({ progressY: 0.5 });
      }
    }

    window.removeEventListener(touches ? 'touchmove' : 'mousemove', this.onMoveDrag);

    this.setState({
      dragAxis: undefined,
      dragBeginX: undefined,
      dragBeginY: undefined,
      dragPosition: undefined,
      dragStartProgress: undefined,
      dragThumbLength: undefined,
      dragTrackLength: undefined,
      dragType: undefined,
    });
  };
}
