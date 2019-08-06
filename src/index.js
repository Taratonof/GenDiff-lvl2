import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import generationStringData from './formatters';

const buildObject = (dataFile) => {
  const fileContent = dataFile.content;
  const fileType = dataFile.type;
  if (fileType === '.json') {
    return JSON.parse(fileContent);
  }
  if (fileType === '.yml') {
    return yaml.safeLoad(fileContent);
  }
  if (fileType === '.ini') {
    return ini.decode(fileContent);
  }
  throw new Error('not the right format');
};

const runGenDiff = (firstPath, secondPath, format = 'tree') => {
  const beforePath = path.resolve(process.cwd(), firstPath);
  const afterPath = path.resolve(process.cwd(), secondPath);
  const contentFirstFile = fs.readFileSync(beforePath, 'utf-8');
  const contentSecondFile = fs.readFileSync(afterPath, 'utf-8');
  const extnameFirstFile = path.extname(beforePath);
  const extnameSecondFile = path.extname(afterPath);
  const dataFirstFile = {
    content: contentFirstFile,
    type: extnameFirstFile,
  };
  const dataSecondFile = {
    content: contentSecondFile,
    type: extnameSecondFile,
  };
  const beforeValue = buildObject(dataFirstFile);
  const afterValue = buildObject(dataSecondFile);
  console.log(generationStringData(beforeValue, afterValue, format));

  return generationStringData(beforeValue, afterValue, format);
};

export default runGenDiff;
