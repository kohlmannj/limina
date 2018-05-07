import { css } from 'emotion';
import defaultTheme from '../../theme';
import { IStyledScrollBarProps } from '../ScrollBar';

export const root = css`
  position: relative;
  overflow: hidden;
`;

export const absolutelyPositioned = css`
  position: absolute;
  z-index: 1;
`;

export const overflowContainer = ({ theme }: IStyledScrollBarProps) => css`
  overflow: auto;
  width: ${`calc(100% - ${
    theme && typeof theme.trackWidth !== 'undefined' ? theme.trackWidth : defaultTheme.trackWidth
  }px)`};
  height: ${`calc(100% - ${
    theme && typeof theme.trackWidth !== 'undefined' ? theme.trackWidth : defaultTheme.trackWidth
  }px)`};
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`;
