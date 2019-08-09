import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import generationStringData from './formatters';

const getParser = (extnameFile) => {
  const extname = extnameFile.replace('.', '');
  const mapping = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.decode,
  };
  return mapping[extname];
};

const runGenDiff = (firstPath, secondPath, format = 'tree') => {
  const beforePath = path.resolve(process.cwd(), firstPath);
  const afterPath = path.resolve(process.cwd(), secondPath);
  const contentFirstFile = fs.readFileSync(beforePath, 'utf-8');
  const contentSecondFile = fs.readFileSync(afterPath, 'utf-8');
  const extnameFirstFile = path.extname(beforePath);
  const extnameSecondFile = path.extname(afterPath);

  const beforeValue = getParser(extnameFirstFile)(contentFirstFile);
  const afterValue = getParser(extnameSecondFile)(contentSecondFile);

  return generationStringData(beforeValue, afterValue, format);
};

export default runGenDiff;
