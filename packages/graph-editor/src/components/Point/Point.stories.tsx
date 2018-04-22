import { storiesOf } from '@storybook/react'; // tslint:disable-line no-implicit-dependencies
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { PointTuple } from '../../index.d';
import Point from './Point';

const testPoints: PointTuple[] = [[320, 320], [480, 0], [1280, 1160]];

storiesOf('graph-editor/Point', module)
  .add('with default appearance', () => <Point x={0} y={0} />)
  .add('with selected appearance', () => <Point selected x={0} y={0} />)
  .add('with diamond appearance', () => (
    <ThemeProvider theme={{ shape: 'diamond' }}>
      <Point x={0} y={0} />
    </ThemeProvider>
  ))
  .add('with diamond, selected appearance', () => (
    <ThemeProvider theme={{ shape: 'diamond' }}>
      <Point selected x={0} y={0} />
    </ThemeProvider>
  ))
  .add('with square appearance', () => (
    <ThemeProvider theme={{ shape: 'square' }}>
      <Point x={0} y={0} />
    </ThemeProvider>
  ))
  .add('with square, selected appearance', () => (
    <ThemeProvider theme={{ shape: 'square' }}>
      <Point selected x={0} y={0} />
    </ThemeProvider>
  ))
  .add('with theme', () => (
    <ThemeProvider theme={{ color: 'red', thickness: 16 }}>
      <Point x={0} y={0} />
    </ThemeProvider>
  ))
  .add('with theme and selected appearance', () => (
    <ThemeProvider theme={{ color: 'red', thickness: 16 }}>
      <Point selected x={0} y={0} />
    </ThemeProvider>
  ));
