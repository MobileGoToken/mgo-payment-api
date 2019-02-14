
const abiDecoder = require('abi-decoder');
const { eth } = require('../../config');
const { TokenTransferError } = require('../utils/errors');

abiDecoder.addABI(eth.token.abi);

class TokenTransaction {
  constructor(txData) {
    try {
      const tx = abiDecoder.decodeMethod(txData);
      if (tx.name === 'transfer') {
        this.to = tx.params[0].value; // first param is _to
        this.value = tx.params[1].value; // second param is _value
        this.data = tx.params[2] ? tx.params[2].value : null; // _data (not included always)
      }
    } catch (err) {
      throw new TokenTransferError('Invalid token transfer data', 400, err.stack);
    }
  }
}

module.exports = TokenTransaction;
