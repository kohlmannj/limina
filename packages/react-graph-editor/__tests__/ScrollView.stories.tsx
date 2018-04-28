/* tslint:disable no-implicit-dependencies */
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import textContent from '../../../__stubs__/lipsum.md';
import ScrollView from '../src/components/ScrollView';

storiesOf('react-graph-editor/ScrollView', module)
  .add('with y overflow', () => (
    <ThemeProvider theme={{ trackWidth: 16, thumbWidth: 8 }}>
      <ScrollView
        style={{
          width: '50vw',
          height: '50vh',
          margin: '50px auto',
          background: 'gray',
          outline: '2px solid rebeccapurple',
        }}
        dangerouslySetInnerHTML={{ __html: textContent }}
      />
    </ThemeProvider>
  ))
  .add('with x and y overflow', () => (
    <ThemeProvider theme={{ trackWidth: 16, thumbWidth: 8 }}>
      <ScrollView
        style={{
          width: '50vw',
          height: '50vh',
          margin: '50px auto',
          background: 'gray',
          outline: '2px solid rebeccapurple',
        }}
      >
        <div style={{ width: '200%' }} dangerouslySetInnerHTML={{ __html: textContent }} />
      </ScrollView>
    </ThemeProvider>
  ));
