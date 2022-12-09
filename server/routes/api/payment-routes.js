const router = require('express').Router();
const { createPayment, getStatement } = require('../../controllers/payment-controller');

router   
   .route('/')
   .post(createPayment)
   .get(getStatement)


module.exports = router