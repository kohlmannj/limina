import React, { Component } from 'react';
import { css } from 'react-emotion';
import { ScrollBarOrientation } from '..';
import ScrollView, { IScrollViewProps } from './ScrollView';

export type ScalePosition = 'start' | 'end';

export interface IScalingScrollGraphState {
  mouseStartX?: number;
  mouseStartY?: number;
  orientation?: ScrollBarOrientation;
  position?: ScalePosition;
  scaleX?: number;
  scaleY?: number;
  thumbLength?: number;
  trackLength?: number;
}

export interface IScaleEventHandlerOptions {
  orientation: ScrollBarOrientation;
  position: ScalePosition;
}

export type MouseEventListener = (event: MouseEvent) => void;

export interface IOnStopScaleEventHandlerFactory extends IScaleEventHandlerOptions {
  onMouseMove: MouseEventListener;
}

export type ScaleEventHandlerFactory = (
  options: IScaleEventHandlerOptions
) => React.MouseEventHandler<HTMLButtonElement>;

export default class StatefulScrollGraph extends Component<
  IScrollViewProps,
  IScalingScrollGraphState
> {
  public static defaultProps = {
    scaleX: 1,
    scaleY: 1,
  };

  public state: IScalingScrollGraphState = {
    scaleX: this.props.scaleX,
    scaleY: this.props.scaleY,
  };

  public componentWillReceiveProps({ scaleX, scaleY }: IScrollViewProps) {
    let shouldStopDragging = false;

    if (scaleX !== this.props.scaleX && typeof scaleX !== 'undefined') {
      this.setState({ scaleX });
      shouldStopDragging = true;
    }

    if (scaleY !== this.props.scaleY && typeof scaleY !== 'undefined') {
      this.setState({ scaleY });
      shouldStopDragging = true;
    }

    if (shouldStopDragging) {
      window.removeEventListener('mousemove', this.onChangeScale);
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('mousemove', this.onChangeScale);
    window.removeEventListener('mouseup', this.onStopScale);
  }

  public render() {
    const {
      children,
      /* scaleX: scaleXProp, scaleY: scaleYProp, */ style /* , ...rest */,
    } = this.props;
    const { scaleX, scaleY } = this.state;

    return (
      <ScrollView
        contentClassName={css`
          width: ${(scaleX || 1) * 100}%;
          height: ${(scaleY || 1) * 100}%;
        `}
        scaleX={scaleX}
        scaleY={scaleY}
        thumbXStartProps={{
          onMouseDown: this.onStartScale({ orientation: 'horizontal', position: 'start' }),
        }}
        thumbXEndProps={{
          onMouseDown: this.onStartScale({ orientation: 'horizontal', position: 'end' }),
        }}
        thumbYStartProps={{
          onMouseDown: this.onStartScale({ orientation: 'vertical', position: 'start' }),
        }}
        thumbYEndProps={{
          onMouseDown: this.onStartScale({ orientation: 'vertical', position: 'end' }),
        }}
        className={css`
          width: 100%;
          height: 100%;
        `}
        style={style}
      >
        {children}
      </ScrollView>
    );
  }

  private onStartScale = ({ orientation, position }: IScaleEventHandlerOptions) => ({
    clientX: mouseStartX,
    clientY: mouseStartY,
    target,
  }: React.MouseEvent<HTMLButtonElement>): void => {
    const thumb: HTMLElement | null = (target as HTMLButtonElement).parentElement;
    const track: HTMLElement | null = thumb ? (thumb as HTMLDivElement).parentElement : null;

    let thumbLength;
    let trackLength;

    if (thumb) {
      const { width, height } = thumb.getBoundingClientRect();

      if (orientation === 'horizontal') {
        thumbLength = width;
      } else if (orientation === 'vertical') {
        thumbLength = height;
      }
    }

    if (track) {
      const { width, height } = track.getBoundingClientRect();

      if (orientation === 'horizontal') {
        trackLength = width;
      } else if (orientation === 'vertical') {
        trackLength = height;
      }
    }

    this.setState({ orientation, mouseStartX, mouseStartY, position, thumbLength, trackLength });

    window.addEventListener('mousemove', this.onChangeScale);
    window.addEventListener('mouseup', this.onStopScale, {
      once: true,
    });
  };

  private onChangeScale = (e: MouseEvent): void => {
    const {
      mouseStartX,
      mouseStartY,
      orientation,
      position,
      thumbLength,
      trackLength,
    } = this.state;

    const dX = e.clientX - mouseStartX!;
    const dY = e.clientY - mouseStartY!;

    let dLength;

    if (orientation === 'horizontal') {
      dLength = position === 'start' ? -dX : dX;
    } else if (orientation === 'vertical') {
      dLength = position === 'start' ? -dY : dY;
    }

    const nextThumbLength = thumbLength && dLength && thumbLength + dLength;
    const rawNextScale = trackLength && nextThumbLength ? trackLength / nextThumbLength : undefined;
    const nextScale = Math.min(Math.max(rawNextScale || 1, 1), 10);

    this.setState({ [`scale${orientation === 'horizontal' ? 'X' : 'Y'}`]: nextScale });
  };

  private onStopScale = (e: MouseEvent): void => {
    this.setState({
      orientation: undefined,
      position: undefined,
      thumbLength: undefined,
      trackLength: undefined,
    });

    window.removeEventListener('mousemove', this.onChangeScale);
  };
}
