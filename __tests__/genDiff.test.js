import path from 'path';
import fs from 'fs';
import runGennDiff from '../src/runGennDiff';

const answerSet = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerSet.txt'), 'utf-8');
const answerTree = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerTree.txt'), 'utf-8');
const answerPlainFormat = fs.readFileSync(path.join(__dirname, '__fixtures__', 'answerPlainFormat.txt'), 'utf-8');

test('test of "runGennDiff" function with JSON format', () => {
  const firstFail = path.join(__dirname, '__fixtures__', 'before.json');
  const secondFail = path.join(__dirname, '__fixtures__', 'after.json');

  expect(runGennDiff(firstFail, secondFail)).toBe(answerSet);
});

test('test of "runGennDiff" function with YAML format', () => {
  const firstFail = path.join(__dirname, '__fixtures__', 'before.yml');
  const secondFail = path.join(__dirname, '__fixtures__', 'after.yml');

  expect(runGennDiff(firstFail, secondFail)).toBe(answerSet);
});

test('test of "runGennDiff" function with INI format', () => {
  const firstFail = path.join(__dirname, '__fixtures__', 'before.ini');
  const secondFail = path.join(__dirname, '__fixtures__', 'after.ini');

  expect(runGennDiff(firstFail, secondFail)).toBe(answerSet);
});

test('test of "runGennDiff" function with the tree JSON format', () => {
  const firstFail = path.join(__dirname, '__fixtures__', 'beforeTree.json');
  const secondFail = path.join(__dirname, '__fixtures__', 'afterTree.json');

  expect(runGennDiff(firstFail, secondFail)).toBe(answerTree);
});

test('test of "runGennDiff" function with the tree YAML format', () => {
  const firstFail = path.join(__dirname, '__fixtures__', 'beforeTree.yml');
  const secondFail = path.join(__dirname, '__fixtures__', 'afterTree.yml');

  expect(runGennDiff(firstFail, secondFail)).toBe(answerTree);
});

test('test of "runGennDiff" function with the tree INI format', () => {
  const firstFail = path.join(__dirname, '__fixtures__', 'beforeTree.ini');
  const secondFail = path.join(__dirname, '__fixtures__', 'afterTree.ini');

  expect(runGennDiff(firstFail, secondFail)).toBe(answerTree);
});

test('test of "runGennDiff" function with the plain JSON format', () => {
  const firstFail = path.join(__dirname, '__fixtures__', 'beforeTree.json');
  const secondFail = path.join(__dirname, '__fixtures__', 'afterTree.json');

  expect(runGennDiff(firstFail, secondFail, 'plain')).toBe(answerPlainFormat);
});
