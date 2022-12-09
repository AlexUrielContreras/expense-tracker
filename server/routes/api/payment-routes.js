const router = require('express').Router();
const { createPayment, getStatement, getSinglePayment, updatePayment, deletePayment } = require('../../controllers/payment-controller');

router   
   .route('/')
   .get(getStatement)
   .post(createPayment)

router 
   .route('/:_id')
   .get(getSinglePayment)
   .put(updatePayment)
   .delete(deletePayment)
   


module.exports = router;