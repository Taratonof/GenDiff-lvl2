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

const answerPlainFormat = `Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [object Object] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

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

test('проверка работы функции gendiff с форматом JSON в с плоским выводом', () => {
  const first = path.join(__dirname, '__fixtures__', 'beforeTree.json');
  const second = path.join(__dirname, '__fixtures__', 'afterTree.json');

  expect(genDiff(first, second, 'plain')).toStrictEqual(answerPlainFormat);
});
