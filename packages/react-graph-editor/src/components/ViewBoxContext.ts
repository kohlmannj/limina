import { Context, createContext } from 'react';
import { ViewBox } from '..';

export const ViewBoxContext: Context<ViewBox> = createContext({
  minX: 0,
  minY: 0,
  maxX: 0,
  maxY: 0,
  width: 0,
  height: 0,
});
