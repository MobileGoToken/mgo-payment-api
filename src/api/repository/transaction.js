
const {
  Transaction,
  TokenTx,
} = require('../models');

const registerTx = async (Tx) => {
  const tx = await Transaction.create(Tx, { include: [TokenTx] });
  Tx.setId(tx.id);
  return Tx;
};

const updateTxStatus = async (Tx, status) => {
  return Transaction.update({ status }, { where: { id: Tx.id } });
};

const getTxById = async (id) => {
  return Transaction.findOne({ where: { id }, include: [TokenTx] });
};

const getTransactions = async (status) => {
  return Transaction.findAll({ where: { status }, include: [TokenTx] });
};

module.exports = {
  registerTx,
  getTxById,
  updateTxStatus,
  getTransactions,
};
