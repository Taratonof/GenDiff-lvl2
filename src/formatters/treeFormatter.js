import _ from 'lodash';

const tabs = num => ' '.repeat(num * 2);

const parseString = (tree) => {
  const parse = (elements, level) => {
    const result = elements.reduce((acc, elem) => {
      switch (elem.type) {
        case 'deleted': {
          if (_.isPlainObject(elem.value)) {
            return `${acc}${tabs(level)}- ${elem.name}: {\n${Object.keys(elem.value).map(key => `${tabs(level + 2)}  ${key}: ${elem.value[key]}`).join('\n')}\n${tabs(level)}  }\n`;
          }
          return `${acc}${tabs(level)}- ${elem.name}: ${elem.value}\n`;
        }
        case 'added': {
          if (_.isPlainObject(elem.value)) {
            return `${acc}${tabs(level)}+ ${elem.name}: {\n${Object.keys(elem.value).map(key => `${tabs(level + 2)}  ${key}: ${elem.value[key]}`).join('\n')}\n${tabs(level)}  }\n`;
          }
          return `${acc}${tabs(level)}+ ${elem.name}: ${elem.value}\n`;
        }
        case 'modified': {
          const oldValue = (_.isPlainObject(elem.oldValue)) ? `{\n${Object.keys(elem.oldValue).map(key => `${tabs(level + 2)}  ${key}: ${elem.oldValue[key]}`).join('\n')}\n${tabs(level)}  }\n${tabs(level)}` : `${elem.oldValue}\n${tabs(level)}`;
          const value = (_.isPlainObject(elem.value)) ? `{\n${Object.keys(elem.value).map(key => `${tabs(level + 2)}  ${key}: ${elem.value[key]}`).join('\n')}\n${tabs(level)}  }\n` : `${elem.value}\n`;
          return `${acc}${tabs(level)}- ${elem.name}: ${oldValue}+ ${elem.name}: ${value}`;
        }
        case 'unmodified': {
          if (elem.children.length === 0) {
            if (_.isPlainObject(elem.value)) {
              return `${acc}${tabs(level)}  ${elem.name}: {\n${Object.keys(elem.value).map(key => `${tabs(level + 2)}  ${key}: ${elem.value[key]}`).join('\n')}\n${tabs(level)}  }\n`;
            }
            return `${acc}${tabs(level)}  ${elem.name}: ${elem.value}\n`;
          }
          return `${acc}${tabs(level)}  ${elem.name}: {\n${parse(elem.children, level + 2)}${tabs(level)}  }\n`;
        }
        default:
          throw new Error('No suitable type');
      }
    }, '');
    return result;
  };
  return `{\n${parse(tree, 1)}}`;
};

export default parseString;
