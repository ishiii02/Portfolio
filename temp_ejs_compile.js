const ejs = require('ejs');
const fs = require('fs');
const path = 'views/pages/home.ejs';
const txt = fs.readFileSync(path, 'utf8');
try {
  ejs.compile(txt, { filename: path });
  console.log('COMPILE_OK');
} catch (err) {
  console.error(err.stack || err);
  process.exit(1);
}
