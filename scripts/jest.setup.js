const emotion = require('emotion');
const { createSerializer } = require('jest-emotion');

expect.addSnapshotSerializer(createSerializer(emotion));

require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
