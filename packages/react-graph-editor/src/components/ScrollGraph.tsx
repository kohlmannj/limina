import React, { CSSProperties, SFC } from 'react';
import { css } from 'react-emotion';
import Graph, { IGraphProps } from './Graph';
import ScrollView from './ScrollView';

export interface IScrollGraphProps extends IGraphProps {
  scaleX?: number;
  scaleY?: number;
  style?: CSSProperties;
}

const ScrollGraph: SFC<IScrollGraphProps> = ({ className, scaleX, scaleY, style, ...rest }) => (
  <ScrollView scaleX={scaleX} scaleY={scaleY} className={className} style={style}>
    <Graph
      className={css`
        width: ${(scaleX || 1) * 100}%;
        height: ${(scaleY || 1) * 100}%;
      `}
      {...rest}
    />
  </ScrollView>
);

ScrollGraph.defaultProps = {
  scaleX: 1,
  scaleY: 1,
};

export default ScrollGraph;
