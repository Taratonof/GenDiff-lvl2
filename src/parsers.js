// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

function tabs(num) {
  return ' '.repeat(num * 2);
}

function difference(before, after) {
  const preResult = Object.keys(before).reduce((acc, key) => {
    if (_.has(after, key)) {
      if (typeof before[key] !== 'string' && typeof before[key] !== 'number' && !(before[key] instanceof Array) && typeof before[key] !== 'boolean' && before[key] instanceof Object) {
        if (typeof before[key] !== typeof after[key]) {
          acc.push({
            type: 'deleted', name: key, value: before[key], children: [],
          });
          acc.push({
            type: 'add', name: key, value: after[key], children: [],
          });
          return acc;
        }
        acc.push({
          type: 'unchanged', name: key, value: 'no value', children: difference(before[key], after[key]),
        });
        return acc;
      }
      if (before[key] === after[key]) {
        acc.push({
          type: 'unchanged', name: key, value: before[key], children: [],
        });
        return acc;
      }
      acc.push({
        type: 'deleted', name: key, value: before[key], children: [],
      });
      acc.push({
        type: 'add', name: key, value: after[key], children: [],
      });
      return acc;
    }
    acc.push({
      type: 'deleted', name: key, value: before[key], children: [],
    });
    return acc;
  }, []);
  const result = Object.keys(after).reduce((acc, key) => {
    if (!_.has(before, key)) {
      acc.push({
        type: 'add', name: key, value: after[key], children: [],
      });
      return acc;
    }
    return acc;
  }, preResult);
  return result;
}

function parseString(tree) {
  const parse = (elements, level) => {
    const result = elements.reduce((acc, elem) => {
      let prefix;
      if (elem.type === 'deleted') {
        prefix = '-';
      }
      if (elem.type === 'add') {
        prefix = '+';
      }
      if (elem.type === 'unchanged') {
        prefix = ' ';
      }
      if (elem.children.length > 0) {
        return `${acc}${tabs(level)}${prefix} ${elem.name}: {\n${parse(elem.children, level + 2)}${tabs(level)}  }\n`;
      }
      if (typeof elem.value !== 'string' && typeof elem.value !== 'number' && !(elem.value instanceof Array) && typeof elem.value !== 'boolean' && elem.value instanceof Object) {
        return `${acc}${tabs(level)}${prefix} ${elem.name}: {\n${Object.keys(elem.value).map(key => `${tabs(level + 2)}  ${key}: ${elem.value[key]}`).join('\n')}\n${tabs(level)}  }\n`;
      }
      return `${acc}${tabs(level)}${prefix} ${elem.name}: ${elem.value}\n`;
    }, '');
    return result;
  };
  return `{\n${parse(tree, 1)}}`;
}


function generationStringData(before, after) {
  const difTree = difference(before, after);
  return parseString(difTree);
}

export default generationStringData;
