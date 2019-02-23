const {
  Fund,
  Transaction,
} = require('../models');

const registerFund = async (fund) => {
  return Fund.create(fund);
};

const getFundFromHmac = async (hmac) => {
  return Fund.findOne({ where: { hmac } });
};

const updateHashAndStatus = async (fund, hash, status) => {
  return fund.update({ hash, status });
};

const updateStatusByHmac = async (hmac, prvStatus, status, type) => {
  const fund = await Fund.update({ status }, {
    where: { hmac, type, status: prvStatus },
    returning: true,
  });

  if (fund[0] === 0) {
    return null;
  }

  return fund[1][0];
};

const getFundsByStatus = async (status) => {
  return Transaction.findAll({ include: [{ model: Fund, where: { status } }] });
};

module.exports = {
  registerFund,
  getFundFromHmac,
  updateHashAndStatus,
  updateStatusByHmac,
  getFundsByStatus,
};
