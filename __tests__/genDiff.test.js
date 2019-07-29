import path from 'path';
import fs from 'fs';
import runGennDiff from '../src/runGennDiff';

test('test of "runGennDiff" function with JSON format', () => {
  const firstFailPath = path.join(__dirname, '__fixtures__', 'before.json');
  const secondFailPath = path.join(__dirname, '__fixtures__', 'after.json');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerSet.txt'), 'utf-8');

  expect(runGennDiff(firstFailPath, secondFailPath)).toBe(result);
});

test('test of "runGennDiff" function with YAML format', () => {
  const firstFailPath = path.join(__dirname, '__fixtures__', 'before.yml');
  const secondFailPath = path.join(__dirname, '__fixtures__', 'after.yml');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerSet.txt'), 'utf-8');

  expect(runGennDiff(firstFailPath, secondFailPath)).toBe(result);
});

test('test of "runGennDiff" function with INI format', () => {
  const firstFailPath = path.join(__dirname, '__fixtures__', 'before.ini');
  const secondFailPath = path.join(__dirname, '__fixtures__', 'after.ini');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerSet.txt'), 'utf-8');

  expect(runGennDiff(firstFailPath, secondFailPath)).toBe(result);
});

test('test of "runGennDiff" function with the tree JSON format', () => {
  const firstFailPath = path.join(__dirname, '__fixtures__', 'beforeTree.json');
  const secondFailPath = path.join(__dirname, '__fixtures__', 'afterTree.json');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerTree.txt'), 'utf-8');

  expect(runGennDiff(firstFailPath, secondFailPath)).toBe(result);
});

test('test of "runGennDiff" function with the tree YAML format', () => {
  const firstFailPath = path.join(__dirname, '__fixtures__', 'beforeTree.yml');
  const secondFailPath = path.join(__dirname, '__fixtures__', 'afterTree.yml');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerTree.txt'), 'utf-8');

  expect(runGennDiff(firstFailPath, secondFailPath)).toBe(result);
});

test('test of "runGennDiff" function with the tree INI format', () => {
  const firstFailPath = path.join(__dirname, '__fixtures__', 'beforeTree.ini');
  const secondFailPath = path.join(__dirname, '__fixtures__', 'afterTree.ini');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerTree.txt'), 'utf-8');

  expect(runGennDiff(firstFailPath, secondFailPath)).toBe(result);
});

test('test of "runGennDiff" function with the plain JSON format', () => {
  const firstFailPath = path.join(__dirname, '__fixtures__', 'beforeTree.json');
  const secondFailPath = path.join(__dirname, '__fixtures__', 'afterTree.json');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerPlainFormat.txt'), 'utf-8');

  expect(runGennDiff(firstFailPath, secondFailPath, 'plain')).toBe(result);
});
