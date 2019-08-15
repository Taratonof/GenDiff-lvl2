
import getTreeFormat from './treeFormatter';
import getPlainFormat from './plainFormatter';
import getJsonFormat from './jsonFormatter';

const mapping = {
  json: getJsonFormat,
  plain: getPlainFormat,
  tree: getTreeFormat,
};

const getFormatter = format => mapping[format];

export default getFormatter;
