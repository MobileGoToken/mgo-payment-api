const crypto = require('crypto');

const hashFund = async (fundData) => {
  const hmac = await crypto.createHmac('sha256', Date.now().toString());
  await hmac.update(`${fundData.from}&${fundData.to}&${fundData.to}`);
  return hmac.digest('hex');
};

module.exports = {
  hashFund,
};
