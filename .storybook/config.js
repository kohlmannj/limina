/* eslint-disable import/no-extraneous-dependencies */
import { addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

addDecorator((story, context) => withInfo()(story)(context));
addDecorator(withKnobs);

const req = require.context('../packages', true, /\.stories\.[jt]sx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
