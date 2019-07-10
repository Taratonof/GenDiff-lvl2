import path from 'path';
import genDiff from '../src/bin/gendiff';

test('проверка функции gendiff', () => {
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
