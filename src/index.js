import path from 'path';
import fs from 'fs';
import generationStringData from './formatters';
import getParser from './parsers';

const runGenDiff = (firstPath, secondPath, format = 'tree') => {
  const beforePath = path.resolve(process.cwd(), firstPath);
  const afterPath = path.resolve(process.cwd(), secondPath);
  const contentFirstFile = fs.readFileSync(beforePath, 'utf-8');
  const contentSecondFile = fs.readFileSync(afterPath, 'utf-8');
  const formatFirstFile = path.extname(beforePath).replace('.', '');
  const formatSecondFile = path.extname(afterPath).replace('.', '');

  const beforeValue = getParser(formatFirstFile)(contentFirstFile);
  const afterValue = getParser(formatSecondFile)(contentSecondFile);
  return generationStringData(beforeValue, afterValue, format);
};

export default runGenDiff;
