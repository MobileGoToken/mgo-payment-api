
const { validateAddress } = require('../validation/ethereum');


const ethService = require('../services/ethereum');

const getBalance = async (req, res, next) => {
  try {
    const { address } = await validateAddress(req.params);
    const balance = await ethService.getTokenBalance(address);
    return res.send({ balance });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getBalance,
};
