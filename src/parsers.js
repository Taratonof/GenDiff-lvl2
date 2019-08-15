import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.decode,
};

const getParser = format => mapping[format];

export default getParser;
