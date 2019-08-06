import path from 'path';
import fs from 'fs';
import runGenDiff from '../src';

test.each([['before.json', 'after.json', 'tree', 'resultSet.txt'], ['before.yml', 'after.yml', 'tree', 'resultSet.txt'], ['before.ini', 'after.ini', 'tree', 'resultSet.txt'],
  ['beforeTree.yml', 'afterTree.yml', 'tree', 'resultTree.txt'], ['beforeTree.ini', 'afterTree.ini', 'tree', 'resultTree.txt'],
  ['beforeTree.json', 'afterTree.json', 'plain', 'resultPlainFormat.txt']])(
  'test of "runGenDiff" function with files "%s" and "%s" and output in "%s" format',
  (beforeFileName, afterFileName, format, resultFileName) => {
    const firstFilePath = path.join(__dirname, '__fixtures__', beforeFileName);
    const secondFilePath = path.join(__dirname, '__fixtures__', afterFileName);
    const result = fs.readFileSync(path.join(__dirname, '__fixtures__', resultFileName), 'utf-8');
    expect(runGenDiff(firstFilePath, secondFilePath, format)).toBe(result);
  },
);
