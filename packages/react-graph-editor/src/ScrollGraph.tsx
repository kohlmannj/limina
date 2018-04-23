import React, { Component, CSSProperties, SFC } from 'react';
import styled, { css } from 'react-emotion';
import { withProps } from 'recompose';
import Graph, { IGraphProps } from './Graph';

export interface IScrollGraphProps extends IGraphProps {
  scaleX?: number;
  scaleY?: number;
  style?: CSSProperties;
}

const HorizontalRange = styled('input')`
  width: 150px;
  height: 15px;
  margin: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  transition: 0.25s opacity ease-in-out;
  opacity: 0;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const VerticalRange = styled(HorizontalRange)`
  transform-origin: 7.5px 50%;
  transform: rotate(90deg);
  top: 0;
  right: -135px;
  bottom: auto;
  left: auto;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.25);
`;

const GraphTrack = styled.div`
  box-sizing: border-box;
  padding-right: 15px;
  padding-bottom: 15px;
`;

const ScrollGraph: SFC<IScrollGraphProps> = ({ className, scaleX, scaleY, style, ...rest }) => (
  <GraphContainer className={className} style={style}>
    <GraphTrack
      className={css({
        width: `${scaleX! * 100}%`,
        height: `${scaleY! * 100}%`,
      })}
    >
      <Graph {...rest} />
    </GraphTrack>
    <HorizontalRange type="range" value={scaleX} min={1} max={10} />
    <VerticalRange type="range" value={scaleY} min={1} max={10} />
  </GraphContainer>
);

ScrollGraph.defaultProps = {
  scaleX: 1,
  scaleY: 1,
};

export default ScrollGraph;
