const path = require('path');
const fs = require('fs');

const testEnvFile = path.resolve(__dirname, '.env.test');
if (fs.existsSync(testEnvFile)) {
  require('dotenv').config({ path: testEnvFile });
}
