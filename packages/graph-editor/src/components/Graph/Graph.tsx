import chroma from 'chroma-js';
import { ThemeProvider } from 'emotion-theming';
import React, { SFC } from 'react';
import styled, { StyledComponent } from 'react-emotion';
import { IThemeProps, IViewBox, OriginDirection, PointTuple } from '../../index.d';
import { flattenPoints, getExtentsForPoints, getViewBoxForPoints } from '../../utils';
import Line, { ILineProps } from '../Line';
import Point, { shapes } from '../Point';
import ViewBoxContext from '../ViewBoxContext';

const shapeNames = Object.keys(shapes);

export interface IGraphProps {
  className?: string;
  lines: ILineProps[];
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
  originX?: OriginDirection;
  originY?: OriginDirection;
}

const Graph: SFC<IGraphProps> = ({
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
            <React.Fragment>
              {points.map(([x, y]) => <Point key={`${label}_${x}_${y}`} x={x} y={y} />)}
            </React.Fragment>
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

const StyledGraph: StyledComponent<IGraphProps, IThemeProps, {}> = styled(Graph)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const GraphContainer: SFC<IGraphProps> = ({ className, ...rest }) => (
  <div className={className}>
    <StyledGraph {...rest} />
  </div>
);

const StyledGraphContainer = styled(GraphContainer)`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: ${props => `${(props.theme.thickness || 8) / 2}px`};
`;

export default StyledGraphContainer;
