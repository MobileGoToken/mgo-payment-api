
const {
  updateTxStatus,
  registerTx,
} = require('../repository/transaction');

const {
  // fundWallet,
  sendRawTransaction,
} = require('./ethereum');

const { BROADCASTED } = require('../constants/tx_status');

const sendStandardTransaction = async (Tx) => {
  await registerTx(Tx);
  await sendRawTransaction(Tx);
  return updateTxStatus(Tx, BROADCASTED);
};

// TODO: Create service transaction
// const sendServiceTransaction = async (Tx) => {

// };

// TODO: Create privileged transaction
// const sendPrivilegedTransaction = async (Tx) => {

// };

module.exports = {
  sendStandardTransaction,
  // sendServiceTransaction,
  // sendPrivilegedTransaction,
};
