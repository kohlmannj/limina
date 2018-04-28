import * as emotion from 'emotion';
import { createSerializer as createEmotionSerializer } from 'jest-emotion';
import { createSerializer as createEnzymeSerializer } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

expect.addSnapshotSerializer(createEmotionSerializer(emotion));
expect.addSnapshotSerializer(createEnzymeSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
