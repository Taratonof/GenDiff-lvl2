import _ from 'lodash';

const tabs = num => ' '.repeat(num * 2);

const parseValue = (value, tabsLevel) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  return `{\n${Object.keys(value)
    .map(key => `${tabs(tabsLevel + 2)}  ${key}: ${value[key]}`)
    .join('\n')}\n${tabs(tabsLevel)}  }`;
};

const parseString = (tree) => {
  const parse = (elements, level) => {
    const result = elements.map((elem) => {
      switch (elem.type) {
        case 'deleted': {
          return `${tabs(level)}- ${elem.name}: ${parseValue(elem.value, level)}`;
        }
        case 'added': {
          return `${tabs(level)}+ ${elem.name}: ${parseValue(elem.value, level)}`;
        }
        case 'modified': {
          const oldValue = parseValue(elem.oldValue, level);
          const newValue = parseValue(elem.newValue, level);
          return `${tabs(level)}- ${elem.name}: ${oldValue}\n${tabs(level)}+ ${elem.name}: ${newValue}`;
        }
        case 'unmodified': {
          return `${tabs(level)}  ${elem.name}: ${parseValue(elem.value, level)}`;
        }
        case 'node': {
          return `${tabs(level)}  ${elem.name}: {\n${parse(elem.children, level + 2)}\n${tabs(level)}  }`;
        }
        default:
          throw new Error(`No suitable type: ${elem.type}`);
      }
    });
    return result.join('\n');
  };
  return `{\n${parse(tree, 1)}\n}`;
};

export default parseString;
