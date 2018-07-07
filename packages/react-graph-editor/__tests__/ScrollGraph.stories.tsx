import { storiesOf } from '@storybook/react'; // tslint:disable-line no-implicit-dependencies
import React from 'react';
import { testLines } from '../__stubs__/testValues';
import ScrollGraph from '../src/components/ScrollGraph';

storiesOf('react-graph-editor/ScrollGraph', module).add('with default scales', () => (
  <ScrollGraph style={{ width: '100%', height: '100vh' }} lines={testLines} />
));
