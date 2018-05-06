import { storiesOf } from '@storybook/react';
// import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { css } from 'react-emotion';
import textContent from '../../../__stubs__/lipsum.md';
import ScrollView from '../src/components/ScrollView';

storiesOf('react-graph-editor/ScrollView', module)
  .add('with auto scale and y overflow', () => (
    <ScrollView
      style={{
        width: '50vw',
        height: '50vh',
        margin: '50px auto',
        background: 'gray',
      }}
      scaleY="auto"
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  ))
  .add('with auto scale and x and y overflow', () => (
    <ScrollView
      style={{
        width: '50vw',
        height: '50vh',
        margin: '50px auto',
        background: 'gray',
      }}
      scaleX="auto"
      scaleY="auto"
    >
      <div style={{ width: '200%' }} dangerouslySetInnerHTML={{ __html: textContent }} />
    </ScrollView>
  ))
  // .add('with x and y overflow and custom theme', () => (
  //   <ThemeProvider
  //     theme={{
  //       trackClassName: css`
  //         background: navy;
  //       `,
  //       trackWidth: 20,
  //       thumbWidth: 20,
  //       thumbClassName: css`
  //         background: crimson;
  //         border-radius: 0;
  //       `,
  //     }}
  //   >
  //     <ScrollView
  //       style={{
  //         width: '50vw',
  //         height: '50vh',
  //         margin: '50px auto',
  //         background: 'gray',
  //       }}
  //       scaleX="auto"
  //       scaleY="auto"
  //     >
  //       <div style={{ width: '200%' }} dangerouslySetInnerHTML={{ __html: textContent }} />
  //     </ScrollView>
  //   </ThemeProvider>
  // ))
  .add('with resizeable kitten', () => (
    <ScrollView style={{ width: '100%', height: '100vh' }}>
      <div
        className={css`
          width: 100%;
          height: 100%;
          background-image: url('https://placekitten.com/g/1600/1600');
          background-size: 100% 100%;
        `}
      />
    </ScrollView>
  ));
