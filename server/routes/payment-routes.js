const router = require('express').Router();

const { createPayment, findPaymentById, findAllPayments, deletePayment } = require('../controllers.js/payment-controller');

router 
   .route('/')
   .get(findAllPayments)
   .post(createPayment)

router
   .route('/:paymentId')
   .get(findPaymentById)
   .delete(deletePayment)