import _ from 'lodash';

function tabs(num) {
  return ' '.repeat(num * 2);
}

function parseString(tree) {
  const parse = (elements, level) => {
    const result = elements.reduce((acc, elem) => {
      let prefix;
      if (elem.type === 'modified') {
        if (_.isPlainObject(elem.oldValue)) {
          prefix = `- ${elem.name}: {\n${Object.keys(elem.oldValue).map(key => `${tabs(level + 2)}  ${key}: ${elem.oldValue[key]}`).join('\n')}\n${tabs(level)}  }\n${tabs(level)}+`;
        } else {
          prefix = `- ${elem.name}: ${elem.oldValue}\n${tabs(level)}+`;
        }
      }
      if (elem.type === 'deleted') {
        prefix = '-';
      }
      if (elem.type === 'added') {
        prefix = '+';
      }
      if (elem.type === 'unmodified') {
        prefix = ' ';
      }
      if (elem.children.length > 0) {
        return `${acc}${tabs(level)}${prefix} ${elem.name}: {\n${parse(elem.children, level + 2)}${tabs(level)}  }\n`;
      }
      if (_.isPlainObject(elem.value)) {
        return `${acc}${tabs(level)}${prefix} ${elem.name}: {\n${Object.keys(elem.value).map(key => `${tabs(level + 2)}  ${key}: ${elem.value[key]}`).join('\n')}\n${tabs(level)}  }\n`;
      }
      return `${acc}${tabs(level)}${prefix} ${elem.name}: ${elem.value}\n`;
    }, '');
    return result;
  };
  return `{\n${parse(tree, 1)}}`;
}

export default parseString;
