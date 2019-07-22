function equalsKeys(deletObj, elements) {
  for (let i = 0; i < elements.length; i += 1) {
    if (deletObj.name === elements[i].name && elements[i].type === 'add') {
      return true;
    }
  }
  return false;
}

function equalsKeysAdd(deletObj, elements) {
  for (let i = 0; i < elements.length; i += 1) {
    if (deletObj.name === elements[i].name && elements[i].type === 'deleted') {
      return elements[i].value;
    }
  }
  return false;
}


function getPlainFormat(tree) {
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
        if (equalsKeys(elem, elements)) {
          return acc;
        }
        return `${acc}Property '${accPath + elem.name}' was removed\n`;
      }
      if (elem.type === 'add') {
        if (equalsKeysAdd(elem, elements) === false) {
          return `${acc}Property '${accPath + elem.name}' was added with value: ${value}\n`;
        }
        const beforeValue = typeof equalsKeysAdd(elem, elements) === 'string' ? `'${equalsKeysAdd(elem, elements)}'` : equalsKeysAdd(elem, elements);
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
}

export default getPlainFormat;
