import { storiesOf } from '@storybook/react'; // tslint:disable-line no-implicit-dependencies
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { PointTuple } from '../../index.d';
import Line from './Line';

const testPoints: PointTuple[] = [[320, 320], [480, 0], [1280, 1160]];

storiesOf('graph-editor/Line', module)
  .add('with points', () => <Line points={testPoints} />)
  .add('with theme', () => (
    <ThemeProvider theme={{ color: 'red', thickness: 4 }}>
      <Line points={testPoints} />
    </ThemeProvider>
  ));
