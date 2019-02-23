const express = require('express');
const {
  standardTransaction,
  serviceTransaction,
  privilegedTransaction,
  getTrasanction,
  registerTransaction,
} = require('../controllers/transaction');

const router = express.Router();

router.post('/standard', standardTransaction);
router.post('/privileged', privilegedTransaction);
router.post('/service', serviceTransaction);

router.post('/register', registerTransaction);

router.get('/:id', getTrasanction);

module.exports = router;
