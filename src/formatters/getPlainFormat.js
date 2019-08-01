const getPlainFormat = (tree) => {
  const parse = (elements, accPath) => {
    const result = elements.reduce((acc, elem) => {
      let value;
      if (typeof elem.value === 'string') {
        value = `'${elem.value}'`;
      } else if (typeof elem.value === 'number' || typeof elem.value === 'boolean') {
        ({ value } = elem);
      } else {
        value = '[complex value]';
      }

      if (elem.type === 'deleted') {
        return `${acc}Property '${accPath + elem.name}' was removed\n`;
      }
      if (elem.type === 'add') {
        return `${acc}Property '${accPath + elem.name}' was added with value: ${value}\n`;
      }
      if (elem.type === 'changed') {
        const beforeValue = typeof elem.oldValue === 'string' ? `'${elem.oldValue}'` : elem.oldValue;
        return `${acc}Property '${accPath + elem.name}' was updated. From ${beforeValue} to ${value}\n`;
      }
      if (elem.type === 'unchanged' && elem.children.length > 0) {
        const path = `${accPath}${elem.name}.`;
        return `${acc}${parse(elem.children, path)}`;
      }
      return acc;
    }, '');
    return result;
  };
  return parse(tree, '').trim();
};

export default getPlainFormat;
