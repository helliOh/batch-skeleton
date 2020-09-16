const path = require('path');
const { Job } = require('../lib/job');

module.exports = {
  helloJob : new Job(path.join(__dirname, './hello'), { name : 'helloJob' }),
  wolrdJob : new Job(path.join(__dirname, './world'), { name : 'wolrdJob' }),
}
