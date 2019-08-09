
import getTreeFormat from './treeFormatter';
import getPlainFormat from './plainFormatter';
import getJsonFormat from './jsonFormatter';
import getTreeDifference from '../ast';

const generationStringData = (before, after, format) => {
  const mapping = {
    json: getJsonFormat,
    plain: getPlainFormat,
    tree: getTreeFormat,
  };
  const difTree = getTreeDifference(before, after);

  return mapping[format](difTree);
};

export default generationStringData;
