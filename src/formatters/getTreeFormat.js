function tabs(num) {
  return ' '.repeat(num * 2);
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

export default parseString;
