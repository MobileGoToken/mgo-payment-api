const Transaction = require('../dto/transaction');

const {
  validateStandardTransaction,
  validateTransactionId,
} = require('../validation/ethereum');

const {
  getTxById,
} = require('../repository/transaction');

const {
  sendStandardTransaction,
  // sendServiceTransaction,
  // sendPrivilegedTransaction,
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
    return res.send('foo');
  } catch (err) {
    return next(err);
  }
};

const privilegedTransaction = async (req, res, next) => {
  try {
    return res.send('bar');
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

module.exports = {
  standardTransaction,
  serviceTransaction,
  getTrasanction,
  privilegedTransaction,
};
