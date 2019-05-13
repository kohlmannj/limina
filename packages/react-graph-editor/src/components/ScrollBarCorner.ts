import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { defaults, ScrollBarTheme } from '../scrollBarTheme';

export type ScrollBarCornerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const ScrollBarCorner: StyledComponent<
  ScrollBarCornerProps,
  ScrollBarCornerProps,
  ScrollBarTheme
> = styled('div')`
  position: absolute;
  z-index: 9999;
  right: 0;
  bottom: 0;
  width: ${props => props.theme.trackWidth || defaults.trackWidth}px;
  height: ${props => props.theme.trackWidth || defaults.trackWidth}px;
  background: ${props => props.theme.trackColor || defaults.trackColor};
  ${props => props.theme.trackClassName};
`;
