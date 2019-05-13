import { css } from '@emotion/core';
import { defaults } from '../../scrollBarTheme';
import { StyledScrollBarProps } from '../ScrollBar';

export const root = css`
  position: relative;
  overflow: hidden;
`;

export const absolutelyPositioned = css`
  position: absolute;
  z-index: 1;
`;

export const overflowContainer = ({ theme }: StyledScrollBarProps) => css`
  overflow: auto;
  width: ${`calc(100% - ${
    theme && typeof theme.trackWidth !== 'undefined' ? theme.trackWidth : defaults.trackWidth
  }px)`};
  height: ${`calc(100% - ${
    theme && typeof theme.trackWidth !== 'undefined' ? theme.trackWidth : defaults.trackWidth
  }px)`};
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`;
