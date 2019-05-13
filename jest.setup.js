const jestEmotionSerializer = require('jest-emotion');
const { createSerializer: createEnzymeSerializer } = require('enzyme-to-json');
const Adapter = require('enzyme-adapter-react-16');
const Enzyme = require('enzyme');

expect.addSnapshotSerializer(jestEmotionSerializer);
expect.addSnapshotSerializer(createEnzymeSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });
