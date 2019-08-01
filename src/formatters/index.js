import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import getTreeFormat from './getTreeFormat';
import getPlainFormat from './getPlainFormat';
import getJsonFormat from './getJsonFormat';
import getTreeDifference from '../parsers';

const buildObject = (fullPath) => {
  const str = fs.readFileSync(fullPath, 'utf-8');
  const extname = path.extname(fullPath);
  if (extname === '.json') {
    return JSON.parse(str);
  }
  if (extname === '.yml') {
    return yaml.safeLoad(str);
  }
  if (extname === '.ini') {
    return ini.decode(str);
  }
  return 'Нет подходящего формата';
};
const generationStringData = (before, after, format) => {
  const mapping = {
    json: tree => getJsonFormat(tree),
    plain: tree => getPlainFormat(tree),
    tree: tree => getTreeFormat(tree),
  };
  const difTree = getTreeDifference(before, after);

  return mapping[format](difTree);
};

const runGenDiff = (firstPath, secondPath, format = 'tree') => {
  const beforePath = path.resolve(process.cwd(), firstPath);
  const afterPath = path.resolve(process.cwd(), secondPath);
  const beforeValue = buildObject(beforePath);
  const afterValue = buildObject(afterPath);
  console.log(generationStringData(beforeValue, afterValue, format));
  return generationStringData(beforeValue, afterValue, format);
};

export default runGenDiff;
