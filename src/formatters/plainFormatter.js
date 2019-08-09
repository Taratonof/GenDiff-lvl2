const getPlainFormat = (tree) => {
  const parse = (elements, accPath) => {
    const result = elements.reduce((acc, elem) => {
      const getValue = () => {
        if (typeof elem.value === 'string') {
          return `'${elem.value}'`;
        }
        if (typeof elem.value === 'number' || typeof elem.value === 'boolean') {
          return elem.value;
        }
        return '[complex value]';
      };

      switch (elem.type) {
        case 'deleted':
          return `${acc}Property '${accPath + elem.name}' was removed\n`;
        case 'added':
          return `${acc}Property '${accPath + elem.name}' was added with value: ${getValue()}\n`;
        case 'modified': {
          const beforeValue = typeof elem.oldValue === 'string' ? `'${elem.oldValue}'` : elem.oldValue;
          return `${acc}Property '${accPath + elem.name}' was updated. From ${beforeValue} to ${getValue()}\n`;
        }
        case 'unmodified': {
          const path = `${accPath}${elem.name}.`;
          return `${acc}${parse(elem.children, path)}`;
        }
        default:
          return acc;
      }
    }, '');
    return result;
  };
  return parse(tree, '').trim();
};

export default getPlainFormat;
