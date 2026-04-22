import fs from 'fs';

const path = './site/package.json';
const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));
pkg.version = process.argv[2];
fs.writeFileSync(path, JSON.stringify(pkg, null, '\t') + '\n');
