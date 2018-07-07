import React, { CSSProperties, SFC } from 'react';
import Graph, { IGraphProps } from './Graph';
import ScrollView from './ScrollView';

export interface IScrollGraphProps extends IGraphProps {
  style?: CSSProperties;
}

const ScrollGraph: SFC<IScrollGraphProps> = ({ className, style, ...rest }) => (
  <ScrollView className={className} style={style}>
    <Graph
      style={{
        width: '100%',
        height: '100%',
      }}
      {...rest}
    />
  </ScrollView>
);

export default ScrollGraph;
