import { Context, createContext } from 'react';
import { IViewBox } from '../../index.d';

const ViewBoxContext: Context<IViewBox> = createContext({ minX: 0, minY: 0, width: 0, height: 0 });

export default ViewBoxContext;
