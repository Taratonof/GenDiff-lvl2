#!/usr/bin/env node
import commander from 'commander';
import runGenDiff from '..';
import { version } from '../../package.json';

const program = commander;

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format: "plain" and "json"')
  .action((firstConfig, secondConfig, cmd) => {
    console.log(runGenDiff(firstConfig, secondConfig, cmd.format));
  })
  .description('Compares two configuration files and shows a difference.');
program.parse(process.argv);
