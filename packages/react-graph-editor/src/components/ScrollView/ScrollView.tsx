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
    const { dragAxis, dragType, progressX, progressY, scaleX, scaleY } = this.state;
    if (!this.overflowContainer) {
      return;
    }

    // While dragging: recalculate scrollLeft and scrollTop positions after scale changes
    if (dragType === 'scale') {
      const { width, height } = this.overflowContainer.getBoundingClientRect();

      if (dragAxis === 'x' && scaleX !== prevState.scaleX && progressX > 0 && progressX < 1) {
        const nextScrollLeft = (this.overflowContainer.scrollWidth - width) * progressX;
        this.overflowContainer.scrollLeft = nextScrollLeft;
      } else if (
        dragAxis === 'y' &&
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
    const onBeginDragXSrt = this.onBeginDrag({ axis: 'x', pos: 'start', type: 'scale' });
    // const onBeginDragXMid = this.onBeginDrag({ axis: 'x', pos: 'middle', type: 'progress' });
    const onBeginDragXEnd = this.onBeginDrag({ axis: 'x', pos: 'end', type: 'scale' });
    const onBeginDragYSrt = this.onBeginDrag({ axis: 'y', pos: 'start', type: 'scale' });
    // const onBeginDragYMid = this.onBeginDrag({ axis: 'y', pos: 'middle', type: 'progress' });
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
          thumbMiddleProps={
            {
              // onMouseDown: onBeginDragXMid,
              // onTouchStart: onBeginDragXMid,
            }
          }
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
          thumbMiddleProps={
            {
              // onMouseDown: onBeginDragYMid,
              // onTouchStart: onBeginDragYMid,
            }
          }
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

      if (dragAxis === 'x') {
        dragThumbLength = width;
      } else if (dragAxis === 'y') {
        dragThumbLength = height;
      }
    }

    if (track) {
      const { width, height } = track.getBoundingClientRect();

      if (dragAxis === 'x') {
        dragTrackLength = width;
      } else if (dragAxis === 'y') {
        dragTrackLength = height;
      }
    }

    this.setState({
      dragAxis,
      dragBeginX,
      dragBeginY,
      dragPosition,
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
      dragType,
      progressX,
      progressY,
    } = this.state;

    if (!dragBeginX || !dragBeginY) {
      return;
    }

    const dX = clientX - dragBeginX;
    const dY = clientY - dragBeginY;

    let dLength;
    let minScale;
    let maxScale;
    let dLengthScaleFactor = 1;

    if (dragAxis === 'x') {
      dLength = dragPosition === 'start' ? -dX : dX;
      minScale = minScaleX;
      maxScale = maxScaleX;
      if (progressX > 0 && progressX < 1) {
        if (dragPosition === 'start') {
          dLengthScaleFactor = 1 / progressX;
        } else if (dragPosition === 'end') {
          dLengthScaleFactor = 1 / (1 - progressX);
        }
      }
    } else if (dragAxis === 'y') {
      dLength = dragPosition === 'start' ? -dY : dY;
      minScale = minScaleY;
      maxScale = maxScaleY;
      if (progressY > 0 && progressY < 1) {
        if (dragPosition === 'start') {
          dLengthScaleFactor = 1 / progressY;
        } else if (dragPosition === 'end') {
          dLengthScaleFactor = 1 / (1 - progressY);
        }
      }
    }

    if (dragType === 'scale') {
      const nextThumbLength =
        dragThumbLength &&
        dLength &&
        dLengthScaleFactor &&
        dragThumbLength + dLength * dLengthScaleFactor;

      let nextScale =
        dragTrackLength && nextThumbLength ? dragTrackLength / nextThumbLength : undefined;

      // Round nextScale to the nearest increment
      if (nextScale && scaleIncrement) {
        nextScale = Math.round(nextScale * 1 / scaleIncrement) / (1 / scaleIncrement);
      }

      if (nextScale && minScale && maxScale && nextScale >= minScale && nextScale <= maxScale) {
        if (dragAxis === 'x') {
          this.setState({ scaleX: nextScale });
        } else if (dragAxis === 'y') {
          this.setState({ scaleY: nextScale });
        }
      }
    } else if (dragType === 'progress') {
      // TODO
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
      dragThumbLength: undefined,
      dragTrackLength: undefined,
      dragType: undefined,
    });
  };
}
