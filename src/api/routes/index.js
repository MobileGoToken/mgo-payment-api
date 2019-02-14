const express = require('express');

const transactions = require('./transaction');
const token = require('./token');
const address = require('./address');

const router = express.Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/transaction', transactions);
router.use('/token', token);
router.use('/address', address);

module.exports = router;
