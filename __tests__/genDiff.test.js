import path from 'path';
import genDiff from '../src/bin/gendiff';

const answerSet = `{\n    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
const answerTree = `{\n    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

test('проверка работы функции gendiff c форматом JSON', () => {
  const first = path.join(__dirname, '__fixtures__', 'before.json');
  const second = path.join(__dirname, '__fixtures__', 'after.json');

  expect(genDiff(first, second)).toStrictEqual(answerSet);
});

test('проверка работы функции gendiff c форматом YAML', () => {
  const first = path.join(__dirname, '__fixtures__', 'before.yml');
  const second = path.join(__dirname, '__fixtures__', 'after.yml');

  expect(genDiff(first, second)).toStrictEqual(answerSet);
});

test('проверка работы функции gendiff c форматом INI', () => {
  const first = path.join(__dirname, '__fixtures__', 'before.ini');
  const second = path.join(__dirname, '__fixtures__', 'after.ini');

  expect(genDiff(first, second)).toStrictEqual(answerSet);
});

test('проверка работы функции gendiff с форматом JSON в виде дерева', () => {
  const first = path.join(__dirname, '__fixtures__', 'beforeTree.json');
  const second = path.join(__dirname, '__fixtures__', 'afterTree.json');

  expect(genDiff(first, second)).toStrictEqual(answerTree);
});

test('проверка работы функции gendiff с форматом YAML в виде дерева', () => {
  const first = path.join(__dirname, '__fixtures__', 'beforeTree.yml');
  const second = path.join(__dirname, '__fixtures__', 'afterTree.yml');

  expect(genDiff(first, second)).toStrictEqual(answerTree);
});

test('проверка работы функции gendiff с форматом INI в виде дерева', () => {
  const first = path.join(__dirname, '__fixtures__', 'beforeTree.ini');
  const second = path.join(__dirname, '__fixtures__', 'afterTree.ini');

  expect(genDiff(first, second)).toStrictEqual(answerTree);
});
