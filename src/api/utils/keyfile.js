
const fs = require('fs');
const { eth } = require('../../config');
const {
  InternalServerError,
} = require('./errors');

const openKeyFile = async () => {
  try {
    const fileContent = fs.readFileSync(eth.account.keyfile);
    return JSON.parse(fileContent);
  } catch (err) {
    // TODO: Log error
    throw new InternalServerError();
  }
};

module.exports = { openKeyFile };
