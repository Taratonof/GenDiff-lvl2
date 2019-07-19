#!/usr/bin/env node
import commander from 'commander';
import path from 'path';
import { version } from '../../package.json';
import parsers from '../parsers';
import buildObject from '../functions/buildObject';

function gendiff(first, second, format = 'tree') {
  const beforePath = path.isAbsolute(first) ? first : path.resolve(process.cwd(), first);
  const afterPath = path.isAbsolute(second) ? second : path.resolve(process.cwd(), second);
  const before = buildObject(beforePath);
  const after = buildObject(afterPath);
  console.log(parsers(before, after, format));
  return parsers(before, after, format);
}

const program = commander;

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, cmd) => {
    gendiff(firstConfig, secondConfig, cmd.format);
  })
  .description('Compares two configuration files and shows a difference.');
program.parse(process.argv);

export default gendiff;
