import _ from 'lodash';

const getTreeDifference = (before, after) => {
  const uniqKeys = _.union(Object.keys(before), Object.keys(after));
  const result = uniqKeys.map((key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (_.isPlainObject(before[key]) && _.isPlainObject(after[key])) {
        return {
          type: 'node', name: key, children: getTreeDifference(before[key], after[key]),
        };
      }
      if (before[key] === after[key]) {
        return {
          type: 'unmodified', name: key, value: before[key], children: [],
        };
      }
      return {
        type: 'modified', name: key, oldValue: before[key], value: after[key], children: [],
      };
    }
    if (_.has(before, key) && !_.has(after, key)) {
      return {
        type: 'deleted', name: key, value: before[key], children: [],
      };
    }
    return {
      type: 'added', name: key, value: after[key], children: [],
    };
  });
  return result;
};

export default getTreeDifference;
