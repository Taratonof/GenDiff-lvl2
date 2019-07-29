import _ from 'lodash';
import getTreeFormat from './formatters/getTreeFormat';
import getPlainFormat from './formatters/getPlainFormat';
import getJsonFormat from './formatters/getJsonFormat';

const getTreeDifference = (before, after) => {
  const preResult = Object.keys(before).reduce((acc, key) => {
    if (_.has(after, key)) {
      if (typeof before[key] !== 'string' && typeof before[key] !== 'number' && !(before[key] instanceof Array) && typeof before[key] !== 'boolean' && before[key] instanceof Object) {
        if (typeof before[key] !== typeof after[key]) {
          const newAcc = acc.concat({
            type: 'deleted', name: key, value: before[key], children: [],
          }).concat({
            type: 'add', name: key, value: after[key], children: [],
          });
          return newAcc;
        }
        const newAcc = acc.concat({
          type: 'unchanged', name: key, value: 'no value', children: getTreeDifference(before[key], after[key]),
        });
        return newAcc;
      }
      if (before[key] === after[key]) {
        const newAcc = acc.concat({
          type: 'unchanged', name: key, value: before[key], children: [],
        });
        return newAcc;
      }
      const newAcc = acc.concat({
        type: 'deleted', name: key, value: before[key], children: [],
      }).concat({
        type: 'add', name: key, value: after[key], children: [],
      });
      return newAcc;
    }
    const newAcc = acc.concat({
      type: 'deleted', name: key, value: before[key], children: [],
    });
    return newAcc;
  }, []);
  const result = Object.keys(after).reduce((acc, key) => {
    if (!_.has(before, key)) {
      const newAcc = acc.concat({
        type: 'add', name: key, value: after[key], children: [],
      });
      return newAcc;
    }
    return acc;
  }, preResult);
  return result;
};

function generationStringData(before, after, format) {
  const difTree = getTreeDifference(before, after);
  if (format === 'json') {
    return getJsonFormat(difTree);
  }
  if (format === 'plain') {
    return getPlainFormat(difTree);
  }
  return getTreeFormat(difTree);
}

export default generationStringData;
