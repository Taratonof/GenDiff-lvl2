#!/usr/bin/env node
import commander from 'commander';
import runGennDiff from '../runGennDiff';
import { version } from '../../package.json';

const program = commander;

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format: "plain" and "json"')
  .action((firstConfig, secondConfig, cmd) => {
    runGennDiff(firstConfig, secondConfig, cmd.format);
  })
  .description('Compares two configuration files and shows a difference.');
program.parse(process.argv);
