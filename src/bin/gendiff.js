#!/usr/bin/env node
import commander from 'commander';
import has from 'lodash/has';
import path from 'path';
import fs from 'fs';
import { version } from '../../package.json';

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
  const beforeFile = fs.readFileSync(beforePath, 'utf-8');
  const afterFile = fs.readFileSync(afterPath, 'utf-8');
  const before = JSON.parse(beforeFile);
  const after = JSON.parse(afterFile);

  const preResult = Object.keys(before).reduce((acc, key) => {
    if (has(after, key)) {
      if (before[key] === after[key]) {
        acc += `    ${key} = ${before[key]}\n`;
        return acc;
      }
      acc += `  - ${key} = ${before[key]}\n` + `  + ${key} = ${after[key]}\n`;
      return acc;
    }
    acc += `  - ${key} = ${before[key]}\n`;
    return acc;
  }, '');
  const result = Object.keys(after).reduce((acc, key) => {
    if (!has(before, key)) {
      acc += `  + ${key} = ${after[key]}\n`;
    }
    return acc;
  }, preResult);

  const finalresult = `{\n${result}}`;

  console.log(finalresult);
  return finalresult;
}

export default gendiff;
