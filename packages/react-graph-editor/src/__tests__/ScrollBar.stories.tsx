import { color, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { ScrollBar } from '../components/ScrollBar';
import { defaults } from '../scrollBarTheme';
import { ScrollBarAxis } from '..';

storiesOf('react-graph-editor/ScrollBar', module)
  .add('with knobs', () => {
    const axis = select(
      'Axis',
      { 'Y (Vertical)': 'y', 'X (Horizontal)': 'x' },
      'y',
      'axis'
    ) as ScrollBarAxis;

    return (
      <ThemeProvider
        theme={{
          thumbColor: color('Thumb Color', defaults.thumbColor, 'thumbColor'),
          trackColor: color('Track Color', defaults.trackColor, 'trackColor'),
          thumbWidth: number(
            'Thumb Width',
            defaults.thumbWidth,
            {
              range: true,
              min: 0,
              max: 100,
              step: 0.5,
            },
            'thumbWidth'
          ),
          trackWidth: number(
            'Track Width',
            defaults.trackWidth,
            {
              range: true,
              min: 0,
              max: 100,
              step: 1,
            },
            'trackWidth'
          ),
        }}
      >
        <ScrollBar
          progress={number(
            'Progress',
            0,
            {
              range: true,
              min: -0.5,
              max: 1.5,
              step: 0.01,
            },
            'progress'
          )}
          scale={number(
            'Scale',
            2,
            {
              range: true,
              min: 1,
              max: 10,
              step: 1,
            },
            'scale'
          )}
          axis={axis}
          overflow={select('Overflow', { Auto: 'auto', Scroll: 'scroll' }, 'auto', 'overflow')}
          style={{ [axis === 'y' ? 'height' : 'width']: '400px', margin: '25vh' }}
        />
      </ThemeProvider>
    );
  })
  .add('with default props', () => <ScrollBar style={{ height: '100vh' }} />);

storiesOf('react-graph-editor/ScrollBar/Y-Axis/Scale 2', module)
  .add('with progress 0', () => <ScrollBar scale={2} style={{ height: '100vh' }} />)
  .add('with progress 0.25', () => (
    <ScrollBar progress={0.25} scale={2} style={{ height: '100vh' }} />
  ))
  .add('with progress 0.5', () => (
    <ScrollBar progress={0.5} scale={2} style={{ height: '100vh' }} />
  ))
  .add('with progress 0.75', () => (
    <ScrollBar progress={0.75} scale={2} style={{ height: '100vh' }} />
  ))
  .add('with progress 1', () => <ScrollBar progress={1} scale={2} style={{ height: '100vh' }} />);

storiesOf('react-graph-editor/ScrollBar/Y-Axis/Scale 10', module)
  .add('with progress 0', () => <ScrollBar scale={10} style={{ height: '100vh' }} />)
  .add('with progress 0.25', () => (
    <ScrollBar progress={0.25} scale={10} style={{ height: '100vh' }} />
  ))
  .add('with progress 0.5', () => (
    <ScrollBar progress={0.5} scale={10} style={{ height: '100vh' }} />
  ))
  .add('with progress 0.75', () => (
    <ScrollBar progress={0.75} scale={10} style={{ height: '100vh' }} />
  ))
  .add('with progress 1', () => <ScrollBar progress={1} scale={10} style={{ height: '100vh' }} />);
