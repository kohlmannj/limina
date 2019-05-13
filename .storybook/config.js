/* eslint-disable import/no-extraneous-dependencies */
const { addDecorator, addParameters, configure } = require('@storybook/react');
const { withKnobs } = require('@storybook/addon-knobs/react');
const { withInfo } = require('@storybook/addon-info');
const customTheme = require('./customTheme');

addParameters({
  options: { theme: customTheme },
});
addDecorator(withInfo);
addDecorator(withKnobs);

const req = require.context('../packages', true, /\.stories\.[t]sx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
