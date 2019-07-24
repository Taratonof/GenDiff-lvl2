import _ from 'lodash';
import getTreeFormat from './formatters/getTreeFormat';
import getPlainFormat from './formatters/getPlainFormat';
import getJsonFormat from './formatters/getJsonFormat';

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

function generationStringData(before, after, format) {
  const difTree = difference(before, after);
  if (format === 'json') {
    return getJsonFormat(difTree);
  }
  if (format === 'plain') {
    return getPlainFormat(difTree);
  }
  return getTreeFormat(difTree);
}

export default generationStringData;
