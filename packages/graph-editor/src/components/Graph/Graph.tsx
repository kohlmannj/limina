import chroma from 'chroma-js';
import { ThemeProvider } from 'emotion-theming';
import React, { SFC } from 'react';
import styled, { StyledComponent } from 'react-emotion';
import { IThemeProps, PointTuple } from '../../index.d';
import { flattenPoints, getExtentsForPoints } from '../../utils';
import Line from '../Line';
import Point from '../Point';

export interface IGraphProps {
  className?: string;
  domain?: [number, number];
  lines: Record<string, PointTuple[]>;
  margin?: number;
  range?: [number, number];
}

const Graph: SFC<IGraphProps> = ({ className, domain, lines, margin, range, ...rest }) => {
  let finalDomain = domain;
  let finalRange = range;

  if (!finalDomain || !finalRange) {
    const { domain: autoDomain, range: autoRange } = getExtentsForPoints(
      flattenPoints(Object.values(lines))
    );

    if (!finalDomain) {
      finalDomain = autoDomain;
    }

    if (!finalRange) {
      finalRange = autoRange;
    }
  }

  return (
    <svg
      className={className}
      viewBox={`${finalDomain[0] - margin} ${finalRange[0] - margin} ${finalDomain[1] -
        finalDomain[0] +
        margin * 2} ${finalRange[1] - finalRange[0] + margin * 2}`}
      {...rest}
    >
      {Object.entries(lines).map(([name, points], index) => (
        <ThemeProvider key={name} theme={{ color: chroma.brewer.Set1[index] }}>
          <React.Fragment>
            <Line points={points} />
            {points.map(([x, y]) => <Point key={`${name}_${x}_${y}`} x={x} y={y} />)}
          </React.Fragment>
        </ThemeProvider>
      ))}
    </svg>
  );
};

Graph.defaultProps = {
  margin: 10,
};

const StyledGraph: StyledComponent<IGraphProps, IThemeProps, {}> = styled(Graph)();

export default StyledGraph;
