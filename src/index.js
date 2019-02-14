
const Promise = require('bluebird');

const app = require('./express');
const { nodeEnv, nodePort } = require('./config');

// TODO: Create logger
console.debug(`Using bluebird promise version: ${Promise.version}`);

app.listen(nodePort, () => {
  console.log(`App listening on port: ${nodePort}, environment: ${nodeEnv}`);
});

module.exports = app;
