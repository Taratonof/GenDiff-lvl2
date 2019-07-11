import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

function buildObject(fullPath) {
  const str = fs.readFileSync(fullPath, 'utf-8');
  let object = {};
  if (path.extname(fullPath) === '.json') {
    object = JSON.parse(str);
  }
  if (path.extname(fullPath) === '.yml') {
    object = yaml.safeLoad(str);
  }
  return object;
}

export default buildObject;
