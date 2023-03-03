const router = require('express').Router();

const { createPayment, findPaymentById, findAllPayments, deletePayments } = require('../controllers.js/payment-controller');
const { authenticateToken } = require('../utills/auth');

router 
   .route('/')
   .get(findAllPayments)

router
   .route('/dashboard')
   .post(authenticateToken, createPayment)

router
   .route('/:paymentId')
   .delete(authenticateToken, deletePayments)

router
   .route('/:paymentId')
   .get(findPaymentById)

module.exports = router;