const express = require('express');
const {
  getAddressData,
} = require('../controllers/address');

const router = express.Router();


router.get('/data/:address', getAddressData);

module.exports = router;
