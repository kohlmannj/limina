import { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, TouchList } from 'react';
import { ScrollBarAxis } from '../../types';
import { ReactMouseOrTouchEvent } from './ScrollView';

export interface INormalizedDragEventData<T> {
  clientX: number;
  clientY: number;
  target: EventTarget;
  thumb: HTMLElement;
  thumbLength: number;
  touches: TouchList;
  track: HTMLElement;
  trackLength: number;
}

export function getNormalizedDragEventData<T>(
  e: ReactMouseOrTouchEvent<T> | TouchEvent | MouseEvent,
  dragAxis: ScrollBarAxis
): INormalizedDragEventData<T> {
  const { target, touches }: { target: EventTarget; touches: TouchList } = e as ReactTouchEvent<T>;
  const { clientX, clientY } = touches ? touches[0] : (e as ReactMouseEvent<T>);

  const thumb: HTMLElement | null = (target as HTMLButtonElement).parentElement;
  const track: HTMLElement | null = thumb ? (thumb as HTMLDivElement).parentElement : null;

  let thumbLength;
  let trackLength;

  if (thumb) {
    const { width, height } = thumb.getBoundingClientRect();

    if (dragAxis === 'x') {
      thumbLength = width;
    } else if (dragAxis === 'y') {
      thumbLength = height;
    } else {
      throw new Error(`Unsupported dragAxis value: ${dragAxis}`);
    }
  } else {
    throw new Error(`Cannot find thumb element`);
  }

  if (track) {
    const { width, height } = track.getBoundingClientRect();

    if (dragAxis === 'x') {
      trackLength = width;
    } else if (dragAxis === 'y') {
      trackLength = height;
    } else {
      throw new Error(`Unsupported dragAxis value: ${dragAxis}`);
    }
  } else {
    throw new Error(`Cannot find track element`);
  }

  // TODO: get target, thumb, and track from React refs instead
  return { clientX, clientY, target, thumb, thumbLength, touches, track, trackLength };
}
