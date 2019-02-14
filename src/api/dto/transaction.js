const EthereumTx = require('ethereumjs-tx');
const Token = require('./token');
const { eth } = require('../../config');
const {
  ExtendableError,
  InvalidContractAddressError,
  MissingTransactionDataError,
  InternalError,
} = require('../utils/errors');

const { ACCEPTED } = require('../constants/tx_status');

class Transaction {
  constructor(rawTx) {
    try {
      const tx = new EthereumTx(rawTx);
      const address = `0x${tx.to.toString('hex')}`;

      if (address !== eth.token.address.toLowerCase()) {
        throw new InvalidContractAddressError();
      }
      if (!tx.data) {
        throw new MissingTransactionDataError();
      }

      this.id = null;
      this.from = `0x${tx.getSenderAddress().toString('hex')}`;
      this.to = address;
      this.data = `0x${tx.data.toString('hex')}`;
      this.nonce = `0x${tx.nonce.toString('hex')}`;
      this.value = `0x${tx.value.toString('hex')}`;
      this.gas = `0x${tx.gas.toString('hex')}`;
      this.gasPrice = `0x${tx.gasPrice.toString('hex')}`;
      this.rawTransaction = rawTx;
      this.r = `0x${tx.r.toString('hex')}`;
      this.s = `0x${tx.s.toString('hex')}`;
      this.v = `0x${tx.v.toString('hex')}`;
      this.hash = tx.hash() ? `0x${tx.hash().toString('hex')}` : null;
      this.status = ACCEPTED;
      this.TokenTx = new Token(this.data);
    } catch (err) {
      if (!(err instanceof ExtendableError)) {
        throw new InternalError('Failed to decode transaction, might be corrupted!', 500, err.stack);
      } else {
        throw err;
      }
    }
  }

  setId(id) {
    this.id = id;
  }
}

module.exports = Transaction;
