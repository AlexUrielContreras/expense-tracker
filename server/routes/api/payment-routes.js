const router = require('express').Router();
const { createPayment, getStatement, getSinglePayment, updatePayment, deletePayment } = require('../../controllers/payment-controller');

router   
   .route('/')
   .get(getStatement)
   
router 
   .route('/:_id')
   .get(getSinglePayment)
   .put(updatePayment)
   .delete(deletePayment)
   
router
   .route('/:userId')   
   .post(createPayment)

module.exports = router;