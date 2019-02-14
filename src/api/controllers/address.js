
const { validateAddress } = require('../validation/ethereum');


const ethService = require('../services/ethereum');

const getAddressData = async (req, res, next) => {
  try {
    const { address } = await validateAddress(req.params);
    const result = await Promise.all([
      ethService.getNonce(address),
      ethService.getGasPrice(),
    ]).then(proms => Object.assign({}, ...proms));
    return res.send(result);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAddressData,
};
