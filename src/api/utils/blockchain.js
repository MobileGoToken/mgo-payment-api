
const req = require('request-promise');

const { eth } = require('../../config');
const {
  InternalServerError,
} = require('./errors');


const getTokenPrice = async () => {
  const result = await req({
    method: 'GET',
    uri: 'https://api.coingecko.com/api/v3/simple/price',
    qs: {
      ids: eth.token.name,
      vs_currencies: 'eth',
    },
    json: true,
  });
  if (result.Response) {
    throw new InternalServerError(`Failed to fetch ${eth.token.symbol} price`);
  }

  return result[eth.token.name].eth;
};

module.exports = {
  getTokenPrice,
};
