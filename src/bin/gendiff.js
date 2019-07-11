#!/usr/bin/env node
import commander from 'commander';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { version } from '../../package.json';
import parsers from '../parsers';
import buildObject from '../functions/buildObject';

const program = commander;

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    // eslint-disable-next-line no-use-before-define
    gendiff(firstConfig, secondConfig);
  })
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');
program.parse(process.argv);

if (program.format) console.log('%s', [program.format]);

function gendiff(first, second) {
  const beforePath = path.isAbsolute(first) ? first : path.resolve(process.cwd(), first);
  const afterPath = path.isAbsolute(second) ? second : path.resolve(process.cwd(), second);
  const before = buildObject(beforePath);
  const after = buildObject(afterPath);

  return parsers(before, after);
}

export default gendiff;
