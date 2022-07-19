const fs = require('fs').promises;

const getTalker = () => fs.readFile('./talker.json', 'utf-8').then((d) => JSON.parse(d));

const setTalker = (data) => fs.writeFile('./talker.json', JSON.stringify(data));

module.exports = { getTalker, setTalker };
