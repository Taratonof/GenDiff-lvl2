import path from 'path';
import parsers from './parsers';
import buildObject from './functions/buildObject';

function runGennDiff(first, second, format = 'tree') {
  const beforePath = path.isAbsolute(first) ? first : path.resolve(process.cwd(), first);
  const afterPath = path.isAbsolute(second) ? second : path.resolve(process.cwd(), second);
  const before = buildObject(beforePath);
  const after = buildObject(afterPath);
  console.log(parsers(before, after, format));
  return parsers(before, after, format);
}

export default runGennDiff;
