import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import generationStringData from './parsers';

function buildObject(fullPath) {
  const str = fs.readFileSync(fullPath, 'utf-8');
  let object = {};
  if (path.extname(fullPath) === '.json') {
    object = JSON.parse(str);
  }
  if (path.extname(fullPath) === '.yml') {
    object = yaml.safeLoad(str);
  }
  if (path.extname(fullPath) === '.ini') {
    object = ini.decode(str);
  }
  return object;
}

function runGennDiff(firstPath, secondPath, format = 'tree') {
  const beforePath = path.resolve(process.cwd(), firstPath);
  const afterPath = path.resolve(process.cwd(), secondPath);
  const beforeValue = buildObject(beforePath);
  const afterValue = buildObject(afterPath);
  console.log(generationStringData(beforeValue, afterValue, format));
  return generationStringData(beforeValue, afterValue, format);
}

export default runGennDiff;
