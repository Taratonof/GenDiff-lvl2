import _ from 'lodash';

function parseObject(before, after) {
  const preResult = Object.keys(before).reduce((acc, key) => {
    if (_.has(after, key)) {
      if (before[key] === after[key]) {
        acc += `    ${key} = ${before[key]}\n`;
        return acc;
      }
      acc += `  - ${key} = ${before[key]}\n` + `  + ${key} = ${after[key]}\n`;
      return acc;
    }
    acc += `  - ${key} = ${before[key]}\n`;
    return acc;
  }, '');
  const result = Object.keys(after).reduce((acc, key) => {
    if (!_.has(before, key)) {
      acc += `  + ${key} = ${after[key]}\n`;
    }
    return acc;
  }, preResult);

  const finalresult = `{\n${result}}`;

  console.log(finalresult);
  return finalresult;
}

export default parseObject;
