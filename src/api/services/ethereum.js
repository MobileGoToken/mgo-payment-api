
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');

const { eth } = require('../../config');
const { openKeyFile } = require('../utils/keyfile');

const {
  GasPriceLowError,
  InternalServerError,
} = require('../utils/errors');

const { FAILED, BROADCASTED } = require('../constants/tx_status');

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

const fundWallet = async (Fund) => {
  try {
    const keyfile = await openKeyFile();
    const acc = await web3.eth.accounts.decrypt(keyfile, eth.account.password);

    const rawTx = await acc.signTransaction({
      to: Fund.from,
      value: web3.utils.toWei(Fund.fee.toString(), 'ether'),
      gas: await hexToNum(eth.gas.eth),
    });

    const Tx = new EthereumTx(rawTx.rawTransaction);
    web3.eth.sendSignedTransaction(rawTx.rawTransaction);

    return { hash: `0x${Tx.hash().toString('hex')}` };
  } catch (err) {
    console.log(err);
    throw new InternalServerError();
  }
};

const sendRawTransaction = async (Tx) => {
  try {
    const hash = await web3.eth.sendSignedTransaction(Tx.rawTransaction);
    updateTxStatus(Tx, BROADCASTED);
    return hash;
  } catch (err) {
    updateTxStatus(Tx, FAILED);
    handleEthereumError(err);
    return null;
  }
};

const getTransferGasCost = async (Tx) => {
  return Tx.data
    ? contract.methods.transfer(Tx.to, Tx.value, Tx.data).estimateGas({ from: Tx.from })
    : contract.methods.transfer(Tx.to, Tx.value).estimateGas({ from: Tx.from });
};

const weiToEth = async (wei) => {
  return web3.utils.fromWei(wei.toString(), 'ether');
};

const ethToWei = async (ether) => {
  return web3.utils.toWei(ether);
};

const hexToNum = async (hex) => {
  return web3.utils.hexToNumber(hex);
};

const numToHex = async (num) => {
  return web3.utils.toHex(num);
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

const transferToken = async (to, value, data = '0x') => {
  const keyfile = await openKeyFile();
  const acc = await web3.eth.accounts.decrypt(keyfile, eth.account.password);

  const rawTx = await acc.signTransaction({
    to: eth.token.address,
    gas: await hexToNum(eth.gas.token),
    data: await contract.methods
      .transfer(to, (value * (10 ** eth.token.decimals)), web3.utils.fromAscii(data)).encodeABI(),
  });

  web3.eth.sendSignedTransaction(rawTx.rawTransaction);
};

module.exports = {
  getBalance,
  getTokenBalance,
  getGasPrice,
  getNonce,
  fundWallet,
  sendRawTransaction,
  getTransferGasCost,
  weiToEth,
  ethToWei,
  hexToNum,
  numToHex,
  transferToken,
};
