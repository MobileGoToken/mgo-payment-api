
const express = require('express');
const {
  getBalance,
} = require('../controllers/token');

const router = express.Router();

router.get('/balance/:address', getBalance);


module.exports = router;
