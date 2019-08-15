import path from 'path';
import fs from 'fs';
import getFormatter from './formatters';
import getParser from './parsers';
import getTreeDifference from './ast';

const runGenDiff = (firstPath, secondPath, format = 'tree') => {
  const beforePath = path.resolve(process.cwd(), firstPath);
  const afterPath = path.resolve(process.cwd(), secondPath);
  const contentFirstFile = fs.readFileSync(beforePath, 'utf-8');
  const contentSecondFile = fs.readFileSync(afterPath, 'utf-8');
  const format1 = path.extname(beforePath).replace('.', '');
  const format2 = path.extname(afterPath).replace('.', '');

  const beforeValue = getParser(format1)(contentFirstFile);
  const afterValue = getParser(format2)(contentSecondFile);
  const difTree = getTreeDifference(beforeValue, afterValue);
  return getFormatter(format)(difTree);
};

export default runGenDiff;
