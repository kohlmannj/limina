import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

expect.addSnapshotSerializer(createSerializer(emotion));

require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
