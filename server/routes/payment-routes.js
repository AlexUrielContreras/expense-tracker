const router = require('express').Router();

const { createPayment, findPaymentById, findAllPayments, deletePayments } = require('../controllers.js/payment-controller');

router 
   .route('/')
   .get(findAllPayments)

router
   .route('/dashboard/:userId')
   .post(createPayment)

router
   .route('/:paymentId/:userId')
   .delete(deletePayments)

router
   .route('/:paymentId')
   .get(findPaymentById)

module.exports = router;