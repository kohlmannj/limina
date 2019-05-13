/** @jsx jsx */
import { jsx } from '@emotion/core';
import chroma from 'chroma-js';
import { ThemeProvider } from 'emotion-theming';
import { CSSProperties, Fragment, FunctionComponent } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { getViewBoxForPoints } from '../utils';
import { Point, shapes } from './Point';
import { PolyLineSVGProps } from './PolyLineSVG';
import { ViewBoxContext } from './ViewBoxContext';
import { ThemeProps, OriginDirection, PointTuple } from '..';

const shapeNames = Object.keys(shapes);

export interface GraphProps {
  className?: string;
  lines: PolyLineSVGProps[];
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
  originX?: OriginDirection;
  originY?: OriginDirection;
  style?: CSSProperties;
}

const Graph: FunctionComponent<GraphProps> = ({
  className,
  lines,
  minX: minXProp,
  minY: minYProp,
  maxX: maxXProp,
  maxY: maxYProp,
  originX,
  originY,
  ...rest
}) => {
  const autoViewBox = getViewBoxForPoints(
    lines.reduce((reducedPoints: PointTuple[], { points }) => [...reducedPoints, ...points], [])
  );

  const minX = typeof minXProp === 'number' ? minXProp : autoViewBox.minX;
  const minY = typeof minYProp === 'number' ? minYProp : autoViewBox.minY;
  const maxX = typeof maxXProp === 'number' ? maxXProp : autoViewBox.maxX;
  const maxY = typeof maxYProp === 'number' ? maxYProp : autoViewBox.maxY;

  const viewBox = {
    minX,
    minY,
    maxX,
    maxY,
    originX,
    originY,
    width: typeof minX === 'number' && typeof maxX === 'number' ? Math.abs(maxX - minX) : 0,
    height: typeof minY === 'number' && typeof maxY === 'number' ? Math.abs(maxY - minY) : 0,
  };

  return (
    <div className={className} {...rest}>
      <ViewBoxContext.Provider value={viewBox}>
        {lines.map(({ label, points }, index) => (
          <ThemeProvider
            key={label}
            theme={{
              color: chroma.brewer.Set1[index % chroma.brewer.Set1.length],
              shape: shapeNames[index % shapeNames.length],
            }}
          >
            <Fragment>
              {points.map(([x, y]) => (
                <Point key={`${label}_${x}_${y}`} x={x} y={y} />
              ))}
            </Fragment>
          </ThemeProvider>
        ))}
      </ViewBoxContext.Provider>
    </div>
  );
};

Graph.defaultProps = {
  originX: 'left',
  originY: 'bottom',
};

const StyledGraph: StyledComponent<GraphProps, GraphProps, ThemeProps> = styled(Graph)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const GraphContainer: FunctionComponent<GraphProps> = ({ className, style, ...rest }) => (
  <div className={className} style={style}>
    <StyledGraph {...rest} />
  </div>
);

export const StyledGraphContainer = styled(GraphContainer)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: ${props => `${(props.theme.thickness || 8) / 2}px`};
`;
