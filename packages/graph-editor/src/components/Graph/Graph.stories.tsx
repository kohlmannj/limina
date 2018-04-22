import { storiesOf } from '@storybook/react'; // tslint:disable-line no-implicit-dependencies
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { testLines } from '../../__stubs__/testValues';
import Graph from './Graph';

storiesOf('graph-editor/Graph', module)
  .add('with lines', () => (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.25)',
      }}
    >
      <Graph lines={testLines} />
    </div>
  ))
  .add('with lines and theme', () => (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.25)',
      }}
    >
      <ThemeProvider theme={{ thickness: 16 }}>
        <Graph lines={testLines} />
      </ThemeProvider>
    </div>
  ))
  .add('with lines and theme and zero point', () => (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.25)',
      }}
    >
      <ThemeProvider theme={{ thickness: 16 }}>
        <Graph minX={0} minY={0} lines={testLines} />
      </ThemeProvider>
    </div>
  ))
  .add('with lines and theme and custom bounds', () => (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.25)',
      }}
    >
      <ThemeProvider theme={{ thickness: 16 }}>
        <Graph minX={-1000} minY={-1000} maxX={1605} maxY={1605} lines={testLines} />
      </ThemeProvider>
    </div>
  ));
