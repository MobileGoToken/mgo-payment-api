const Transaction = require('../dto/transaction');
const Fund = require('../dto/fund');

const {
  validateStandardTransaction,
  validateTransactionId,
  validateFundRegister,
  validateFeelessTransaction,
} = require('../validation');

const {
  getTxById,
} = require('../repository/transaction');

const {
  registerFund,
  sendStandardTransaction,
  sendServiceTransaction,
  sendPrivilegedTransaction,
} = require('../services/transaction');

const standardTransaction = async (req, res, next) => {
  try {
    const { rawTransaction } = await validateStandardTransaction(req.body);
    const Tx = new Transaction(rawTransaction);
    await sendStandardTransaction(Tx);

    return res.status(200).send({ message: 'Transaction sent successfully' });
  } catch (err) {
    return next(err);
  }
};

const serviceTransaction = async (req, res, next) => {
  try {
    const { hash, rawTransaction } = await validateFeelessTransaction(req.body);
    const Tx = new Transaction(rawTransaction);
    const result = await sendServiceTransaction(Tx, hash);
    return res.send({ result });
  } catch (err) {
    return next(err);
  }
};

const privilegedTransaction = async (req, res, next) => {
  try {
    const { hash, rawTransaction } = await validateFeelessTransaction(req.body);
    const Tx = new Transaction(rawTransaction);
    const result = await sendPrivilegedTransaction(Tx, hash);
    return res.send({ result });
  } catch (err) {
    return next(err);
  }
};

const getTrasanction = async (req, res, next) => {
  try {
    const { id } = await validateTransactionId(req.params);
    const tx = await getTxById(id);
    return res.send(tx);
  } catch (err) {
    return next(err);
  }
};

const registerTransaction = async (req, res, next) => {
  try {
    const fundData = await validateFundRegister(req.body);
    const fund = new Fund(fundData);
    const result = await registerFund(fund);

    return res.send({
      hash: result.hash,
      address: result.address,
      value: result.value,
      gasLimit: result.gasLimit,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  standardTransaction,
  serviceTransaction,
  getTrasanction,
  privilegedTransaction,
  registerTransaction,
};
