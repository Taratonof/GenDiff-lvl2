import path from 'path';
import fs from 'fs';
import runGenDiff from '../src/formatters';

const runTest = (beforeFileName, afterFileName, resultFileName, format = 'tree') => {
  const firstFailPath = path.join(__dirname, '__fixtures__', beforeFileName);
  const secondFailPath = path.join(__dirname, '__fixtures__', afterFileName);
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', resultFileName), 'utf-8');

  expect(runGenDiff(firstFailPath, secondFailPath, format)).toBe(result);
};

test('test of "runGenDiff" function with JSON format', () => {
  runTest('before.json', 'after.json', 'resultSet.txt');
});

test('test of "runGenDiff" function with YAML format', () => {
  runTest('before.yml', 'after.yml', 'resultSet.txt');
});

test('test of "runGenDiff" function with INI format', () => {
  runTest('before.ini', 'after.ini', 'resultSet.txt');
});

test('test of "runGenDiff" function with the tree JSON format', () => {
  runTest('beforeTree.json', 'afterTree.json', 'resultTree.txt');
});

test('test of "runGenDiff" function with the tree YAML format', () => {
  runTest('beforeTree.yml', 'afterTree.yml', 'resultTree.txt');
});

test('test of "runGenDiff" function with the tree INI format', () => {
  runTest('beforeTree.ini', 'afterTree.ini', 'resultTree.txt');
});

test('test of "runGenDiff" function with the plain JSON format', () => {
  runTest('beforeTree.json', 'afterTree.json', 'resultPlainFormat.txt', 'plain');
});
