import _ from 'lodash';

const tabs = num => ' '.repeat(num * 2);

const parseString = (tree) => {
  const parse = (elements, level) => {
    const result = elements.reduce((acc, elem) => {
      const getPrefix = () => {
        switch (elem.type) {
          case 'modified': {
            if (_.isPlainObject(elem.oldValue)) {
              return `- ${elem.name}: {\n${Object.keys(elem.oldValue).map(key => `${tabs(level + 2)}  ${key}: ${elem.oldValue[key]}`).join('\n')}\n${tabs(level)}  }\n${tabs(level)}+`;
            }
            return `- ${elem.name}: ${elem.oldValue}\n${tabs(level)}+`;
          }
          case 'deleted':
            return '-';
          case 'added':
            return '+';
          case 'unmodified':
            return ' ';
          default:
            throw new Error('No suitable type');
        }
      };

      if (elem.children.length > 0) {
        return `${acc}${tabs(level)}${getPrefix()} ${elem.name}: {\n${parse(elem.children, level + 2)}${tabs(level)}  }\n`;
      }
      if (_.isPlainObject(elem.value)) {
        return `${acc}${tabs(level)}${getPrefix()} ${elem.name}: {\n${Object.keys(elem.value).map(key => `${tabs(level + 2)}  ${key}: ${elem.value[key]}`).join('\n')}\n${tabs(level)}  }\n`;
      }
      return `${acc}${tabs(level)}${getPrefix()} ${elem.name}: ${elem.value}\n`;
    }, '');
    return result;
  };
  return `{\n${parse(tree, 1)}}`;
};

export default parseString;
