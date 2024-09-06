import fs from 'fs';

console.log(`export default "${
  fs.readFileSync('0.db').toString('base64')
}";`);
