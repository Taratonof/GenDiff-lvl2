import _ from 'lodash';

const getTreeDifference = (before, after) => {
  const union = _.union(Object.keys(before), Object.keys(after));
  const result = union.map((key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (typeof before[key] !== 'string' && typeof before[key] !== 'number' && !(before[key] instanceof Array) && typeof before[key] !== 'boolean' && before[key] instanceof Object) {
        if (typeof before[key] !== typeof after[key]) {
          return {
            type: 'changed', name: key, oldValue: before[key], value: after[key], children: [],
          };
        }
        return {
          type: 'unchanged', name: key, value: 'no value', children: getTreeDifference(before[key], after[key]),
        };
      }
      if (before[key] === after[key]) {
        return {
          type: 'unchanged', name: key, value: before[key], children: [],
        };
      }
      return {
        type: 'changed', name: key, oldValue: before[key], value: after[key], children: [],
      };
    }
    if (_.has(before, key) && !_.has(after, key)) {
      return {
        type: 'deleted', name: key, value: before[key], children: [],
      };
    }
    if (!_.has(before, key) && _.has(after, key)) {
      return {
        type: 'add', name: key, value: after[key], children: [],
      };
    }
    return 'ВАКУУМ';
  });
  return result;
};

export default getTreeDifference;
