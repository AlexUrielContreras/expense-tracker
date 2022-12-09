const router = require('express').Router();
const { createPayment, getStatement, getSinglePayment, deletePayment } = require('../../controllers/payment-controller');

router   
   .route('/')
   .get(getStatement)
   .post(createPayment)

router 
   .route('/:_id')
   .get(getSinglePayment)
   .delete(deletePayment)


module.exports = router;