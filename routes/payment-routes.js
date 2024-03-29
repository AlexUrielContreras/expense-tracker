const router = require('express').Router();

const { createPayment, findPaymentById, findAllPayments, findAllUserPayment, updatePayment, deletePayments } = require('../controllers.js/payment-controller');
const { authenticateToken } = require('../utills/auth');

router 
   .route('/')
   .get(findAllPayments)

router
   .route('/dashboard')
   .post(authenticateToken, createPayment)
   .get(authenticateToken, findAllUserPayment)

router
   .route('/:paymentId')
   .delete(authenticateToken, deletePayments)

router
   .route('/:paymentId')
   .get(findPaymentById)
   .put(updatePayment)

module.exports = router;