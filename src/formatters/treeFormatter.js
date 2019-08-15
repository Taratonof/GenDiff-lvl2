import _ from 'lodash';

const tabs = num => ' '.repeat(num * 2);

const parsePlainObject = (object, tabsLevel) => `{\n${Object.keys(object)
  .map(key => `${tabs(tabsLevel + 2)}  ${key}: ${object[key]}`)
  .join('\n')}\n${tabs(tabsLevel)}  }\n`;

const parseString = (tree) => {
  const parse = (elements, level) => {
    const result = elements.map((elem) => {
      switch (elem.type) {
        case 'deleted': {
          if (_.isPlainObject(elem.value)) {
            return `${tabs(level)}- ${elem.name}: ${parsePlainObject(elem.value, level)}`;
          }
          return `${tabs(level)}- ${elem.name}: ${elem.value}\n`;
        }
        case 'added': {
          if (_.isPlainObject(elem.value)) {
            return `${tabs(level)}+ ${elem.name}: ${parsePlainObject(elem.value, level)}`;
          }
          return `${tabs(level)}+ ${elem.name}: ${elem.value}\n`;
        }
        case 'modified': {
          const oldValue = (_.isPlainObject(elem.oldValue)) ? `${parsePlainObject(elem.oldValue, level)}${tabs(level)}` : `${elem.oldValue}\n${tabs(level)}`;
          const value = (_.isPlainObject(elem.value)) ? parsePlainObject(elem.value, level) : `${elem.value}\n`;
          return `${tabs(level)}- ${elem.name}: ${oldValue}+ ${elem.name}: ${value}`;
        }
        case 'unmodified': {
          if (_.isPlainObject(elem.value)) {
            return `${tabs(level)}  ${elem.name}: ${parsePlainObject(elem.value, level)}`;
          }
          return `${tabs(level)}  ${elem.name}: ${elem.value}\n`;
        }
        case 'node': {
          return `${tabs(level)}  ${elem.name}: {\n${parse(elem.children, level + 2)}${tabs(level)}  }\n`;
        }
        default:
          throw new Error('No suitable type');
      }
    });
    return result.join('');
  };
  return `{\n${parse(tree, 1)}}`;
};

export default parseString;
