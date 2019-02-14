const express = require('express');
const {
  standardTransaction,
  serviceTransaction,
  privilegedTransaction,
  getTrasanction,
} = require('../controllers/transaction');

const router = express.Router();

router.post('/standard', standardTransaction);
router.post('/service', serviceTransaction);
router.post('/privileged', privilegedTransaction);

router.get('/:id', getTrasanction);

module.exports = router;
