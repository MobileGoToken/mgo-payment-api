
const Web3 = require('web3');

const { eth } = require('../../config');
const { openKeyFile } = require('../utils/keyfile');

const {
  GasPriceLowError,
  InternalServerError,
} = require('../utils/errors');

const { FAILED } = require('../constants/tx_status');

const {
  updateTxStatus,
} = require('../repository/transaction');

const web3 = new Web3(new Web3.providers.WebsocketProvider(eth.rpc), eth.net.options);
const contract = new web3.eth.Contract(eth.token.abi, eth.token.address);


const getBalance = async (address) => {
  return web3.eth.getBalance(address);
};

const getTokenBalance = async (address) => {
  const result = await contract.methods.balanceOf(address).call();
  return result.balance / (10 ** eth.token.decimals);
};

const getGasPrice = async () => {
  const gasPrice = +await web3.eth.getGasPrice();
  return { gasPrice };
};

const getNonce = async (address) => {
  const nonce = await web3.eth.getTransactionCount(address, 'pending');
  return { nonce };
};

const fundWallet = async (Tx) => {
  const keyfile = await openKeyFile();
  const hash = keyfile.signTransaction({
    to: Tx.from,
    value: Tx.value,
  });
  return { hash };
};

const sendRawTransaction = async (Tx) => {
  return web3.eth.sendSignedTransaction(Tx.rawTransaction)
    .catch((err) => {
      updateTxStatus(Tx, FAILED);
      handleEthereumError(err);
    });
};


const handleEthereumError = (err) => {
  const { code } = JSON.parse(err.message.substr(12));
  switch (code) {
    case -32010:
      throw new GasPriceLowError();
    case -32012:
    default:
      throw new InternalServerError();
  }
};


module.exports = {
  getBalance,
  getTokenBalance,
  getGasPrice,
  getNonce,
  fundWallet,
  sendRawTransaction,
};
