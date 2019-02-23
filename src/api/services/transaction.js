
const txRepo = require('../repository/transaction');
const fundRepo = require('../repository/fund');
const { eth } = require('../../config');
const fundEnum = require('../constants/fund_status');
const { getTokenPrice } = require('../utils/blockchain');
const { hashFund } = require('../utils/hmac');
const { BROADCASTED } = require('../constants/tx_status');
const {
  InvalidTxValueError,
  InsufficientFundsError,
  InvalidReceiverAddressError,
  FundNotExistError,
} = require('../utils/errors');
const {
  sendRawTransaction,
  getGasPrice,
  weiToEth,
  ethToWei,
  hexToNum,
  numToHex,
  getTokenBalance,
  fundWallet,
  transferToken,
} = require('./ethereum');


const sendStandardTransaction = async (Tx) => {
  await txRepo.registerTx(Tx);
  return sendTransaction(Tx);
};

const sendTransaction = async (Tx) => {
  await sendRawTransaction(Tx);
  return txRepo.updateTxStatus(Tx, BROADCASTED);
};

const sendServiceTransaction = async (Tx, hmac) => {
  return fundUser(Tx, hmac, 'service');
};

const sendPrivilegedTransaction = async (Tx, hmac) => {
  return fundUser(Tx, hmac, 'privileged');
};

const fundUser = async (Tx, hmac, type) => {
  const fund = await fundRepo.updateStatusByHmac(hmac, fundEnum.ACCEPTED, fundEnum.PROCESSED, type);

  if (!fund) {
    throw new FundNotExistError();
  }

  const balance = await getTokenBalance(Tx.from) * (10 ** eth.token.decimals);

  const totalCost = (type === 'service')
    ? (fund.value + fund.userFee) * (10 ** eth.token.decimals)
    : fund.value * (10 ** eth.token.decimals);
  const txValue = await hexToNum(Tx.TokenTx.value);

  if (txValue < totalCost) {
    throw new InvalidTxValueError();
  } else if (balance <= totalCost) {
    throw new InsufficientFundsError();
  } else if (Tx.TokenTx.to !== eth.account.address) {
    throw new InvalidReceiverAddressError();
  }

  Tx.fundId = fund.id;
  await txRepo.registerTx(Tx);
  const { hash } = await fundWallet(fund);
  fundRepo.updateHashAndStatus(fund, hash, 'funded');

  return { fund_hash: hash };
};

const calculateFees = async () => {
  const data = await Promise.all([
    getTokenPrice(),
    getGasPrice(),
  ]);

  const tokenPrice = data[0];
  const { gasPrice } = data[1];

  const fundFee = await weiToEth(+gasPrice * +eth.gas.eth);
  const tokenTxFee = await weiToEth(+gasPrice * +eth.gas.token);
  const feeInToken = ((2 * +tokenTxFee + +fundFee) / +tokenPrice).toFixed(8);

  return {
    tokenTxFee,
    feeInToken,
  };
};

const registerFund = async (fundData) => {
  const { tokenTxFee, feeInToken } = await calculateFees();
  const hmac = await hashFund(fundData);

  await fundRepo.registerFund({
    ...fundData,
    hmac,
    fee: tokenTxFee,
    userFee: feeInToken,
    type: fundData.type,
  });

  return {
    hash: hmac,
    address: eth.account.address,
    value: (fundData.type === 'service') ? (+fundData.value + +feeInToken) : +fundData.value,
    gasLimit: await numToHex(await ethToWei(tokenTxFee)),
  };
};

const sendFundedTokens = async (fund) => {
  const value = fund.type === 'service'
    ? fund.value
    : (+fund.value - +fund.userFee);
  return transferToken(fund.to, value, fund.data);
};

module.exports = {
  sendStandardTransaction,
  sendServiceTransaction,
  sendPrivilegedTransaction,
  sendTransaction,
  registerFund,
  sendFundedTokens,
};
