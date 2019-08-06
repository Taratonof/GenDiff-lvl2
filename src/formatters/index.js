
import getTreeFormat from './treeFormatter';
import getPlainFormat from './plainFormatter';
import getJsonFormat from './jsonFormatter';
import getTreeDifference from '../parsers';

const generationStringData = (before, after, format) => {
  const mapping = {
    json: tree => getJsonFormat(tree),
    plain: tree => getPlainFormat(tree),
    tree: tree => getTreeFormat(tree),
  };
  const difTree = getTreeDifference(before, after);

  return mapping[format](difTree);
};

export default generationStringData;
