import { storiesOf } from '@storybook/react'; // tslint:disable-line no-implicit-dependencies
import React from 'react';
import Graph from './Graph';

storiesOf('graph-editor/Graph', module).add('with lines', () => (
  <Graph
    lines={{
      foo: [[320, 12], [480, 16], [1280, 24]],
      bar: [[320, 320], [480, 480], [1280, 1160]],
    }}
  />
));
