import fs from 'fs';
import base64Text from './0.db';

export default
function makeDB(file: fs.PathOrFileDescriptor) {
  fs.writeFileSync(file, Buffer.from(base64Text, 'base64'));
}
