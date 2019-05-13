import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import { StyledPolyLineSVG } from '../components/PolyLineSVG';
import { PointTuple } from '..';

const testPoints: PointTuple[] = [[320, 320], [480, 0], [1280, 1160]];

storiesOf('react-graph-editor/PolyLineSVG', module)
  .add('with points', () => <StyledPolyLineSVG points={testPoints} />)
  .add('with theme', () => (
    <ThemeProvider theme={{ color: 'red', thickness: 4 }}>
      <StyledPolyLineSVG points={testPoints} />
    </ThemeProvider>
  ));
