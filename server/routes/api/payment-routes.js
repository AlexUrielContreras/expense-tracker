const router = require('express').Router();
const { createPayment, getStatement, getSinglePayment, updatePayment, deletePayment } = require('../../controllers/payment-controller');

router   
   .route('/')
   .get(getStatement)
   
router 
   .route('/:paymentId')
   .get(getSinglePayment)
   .put(updatePayment)
   
router
   .route('/:userId')   
   .post(createPayment)

router
   .route('/:userId/:paymentId')
   .delete(deletePayment)




module.exports = router;