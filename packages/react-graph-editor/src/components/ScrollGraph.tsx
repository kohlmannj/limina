import React, { CSSProperties, SFC } from 'react';
import styled, { css } from 'react-emotion';
import { withProps } from 'recompose';
import Graph, { IGraphProps } from './Graph';
import ScrollView from './ScrollView';

export interface IScrollGraphProps extends IGraphProps {
  scaleX?: number;
  scaleY?: number;
  style?: CSSProperties;
}

const GraphContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;

const GraphTrack = styled.div`
  box-sizing: border-box;
  padding-right: 15px;
  padding-bottom: 15px;
`;

const ScrollGraph: SFC<IScrollGraphProps> = ({ className, scaleX, scaleY, style, ...rest }) => (
  <ScrollView className={className} style={style}>
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
