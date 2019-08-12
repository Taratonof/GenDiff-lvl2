import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (format) => {
  const mapping = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.decode,
  };
  return mapping[format];
};

export default getParser;
