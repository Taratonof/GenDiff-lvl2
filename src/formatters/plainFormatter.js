const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  return '[complex value]';
};

const getPlainFormat = (tree) => {
  const parse = (elements, accPath) => {
    const result = elements.map((elem) => {
      switch (elem.type) {
        case 'deleted':
          return `Property '${accPath + elem.name}' was removed`;
        case 'added':
          return `Property '${accPath + elem.name}' was added with value: ${getValue(elem.value)}`;
        case 'modified': {
          return `Property '${accPath + elem.name}' was updated. From ${getValue(elem.oldValue)} to ${getValue(elem.value)}`;
        }
        case 'unmodified': {
          const path = `${accPath}${elem.name}.`;
          return `${parse(elem.children, path)}`.replace('\n', '');
        }
        case 'node': {
          const path = `${accPath}${elem.name}.`;
          return `${parse(elem.children, path)}`.replace('\n', '');
        }
        default:
          throw new Error('No suitable type');
      }
    });
    return result.join('\n');
  };
  return parse(tree, '').trim();
};

export default getPlainFormat;
