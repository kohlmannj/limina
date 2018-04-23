const { createSerializer } = require('jest-emotion');
const Adapter = require('enzyme-adapter-react-16');
const emotion = require('emotion');
const Enzyme = require('enzyme');

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer(emotion));

require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
