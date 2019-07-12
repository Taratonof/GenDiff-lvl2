import path from 'path';
import genDiff from '../src/bin/gendiff';

test('проверка работы функции gendiff c форматом JSON', () => {
  const first = path.join(__dirname, '__fixtures__', 'before.json');
  const second = path.join(__dirname, '__fixtures__', 'after.json');

  const q = `{\n    host = hexlet.io
  - timeout = 50
  + timeout = 20
  - proxy = 123.234.53.22
  - follow = false
  + verbose = true
}`;

  expect(genDiff(first, second)).toStrictEqual(q);
});

test('проверка работы функции gendiff c форматом YAML', () => {
  const first = path.join(__dirname, '__fixtures__', 'before.yml');
  const second = path.join(__dirname, '__fixtures__', 'after.yml');

  const q = `{\n    host = hexlet.io
  - timeout = 50
  + timeout = 20
  - proxy = 123.234.53.22
  - follow = false
  + verbose = true
}`;

  expect(genDiff(first, second)).toStrictEqual(q);
});

test('проверка работы функции gendiff c форматом INI', () => {
  const first = path.join(__dirname, '__fixtures__', 'before.ini');
  const second = path.join(__dirname, '__fixtures__', 'after.ini');

  const q = `{\n    host = hexlet.io
  - timeout = 50
  + timeout = 20
  - proxy = 123.234.53.22
  - follow = false
  + verbose = true
}`;

  expect(genDiff(first, second)).toStrictEqual(q);
});
