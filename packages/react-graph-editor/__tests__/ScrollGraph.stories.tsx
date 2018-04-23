import { storiesOf } from '@storybook/react'; // tslint:disable-line no-implicit-dependencies
import React from 'react';
import { testLines } from '../__stubs__/testValues';
import ScrollGraph from '../src/ScrollGraph';

storiesOf('react-graph-editor/ScrollGraph', module)
  .add('with default scales', () => (
    <ScrollGraph style={{ width: '100%', height: '100vh' }} lines={testLines} />
  ))
  .add('with scaleX = 2', () => (
    <ScrollGraph style={{ width: '100%', height: '100vh' }} scaleX={2} lines={testLines} />
  ))
  .add('with scaleX = 10', () => (
    <ScrollGraph style={{ width: '100%', height: '100vh' }} scaleX={10} lines={testLines} />
  ))
  .add('with scaleY = 2', () => (
    <ScrollGraph style={{ width: '100%', height: '100vh' }} scaleY={2} lines={testLines} />
  ))
  .add('with scaleY = 10', () => (
    <ScrollGraph style={{ width: '100%', height: '100vh' }} scaleY={10} lines={testLines} />
  ))
  .add('with scaleX = scaleY = 2', () => (
    <ScrollGraph
      style={{ width: '100%', height: '100vh' }}
      scaleX={2}
      scaleY={2}
      lines={testLines}
    />
  ))
  .add('with scaleX = scaleY = 10', () => (
    <ScrollGraph
      style={{ width: '100%', height: '100vh' }}
      scaleX={10}
      scaleY={10}
      lines={testLines}
    />
  ));
