import { storiesOf } from '@storybook/react'; // tslint:disable-line no-implicit-dependencies
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { PointTuple } from '../src';
import PolyLineSVG from '../src/PolyLineSVG';

const testPoints: PointTuple[] = [[320, 320], [480, 0], [1280, 1160]];

storiesOf('react-graph-editor/PolyLineSVG', module)
  .add('with points', () => <PolyLineSVG points={testPoints} />)
  .add('with theme', () => (
    <ThemeProvider theme={{ color: 'red', thickness: 4 }}>
      <PolyLineSVG points={testPoints} />
    </ThemeProvider>
  ));
