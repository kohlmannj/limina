import { storiesOf } from '@storybook/react'; // tslint:disable-line no-implicit-dependencies
import React from 'react';
import { css } from 'react-emotion';
import ScalingScrollView from '../src/components/ScalingScrollView';

storiesOf('react-graph-editor/ScalingScrollView', module).add('with default scales', () => (
  <ScalingScrollView style={{ width: '100%', height: '100vh' }}>
    <div
      className={css`
        width: 100%;
        height: 100%;
        background-image: url('https://placekitten.com/g/1600/1600');
        background-size: 100% 100%;
      `}
    />
  </ScalingScrollView>
));
