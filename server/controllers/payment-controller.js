const { Payment } = require('../models');


const paymentController = {
   
   // create payment 
   createPayment({ body }, res) {
      Payment.create(body)
      .then(dbPaymentData => {
         res.json(dbPaymentData)
      })
      .catch(err => {
         console.log(err)
         res.status(500).json(err)
      })
   },
   
   // lookup all payment 
   getStatement(req, res) {
      Payment.find({})
      .then(dbPaymentData => res.json(dbPaymentData))
      .catch(err => {
         console.log(err)
         res.state(500).json(err)
      })
   },

   // lookup one payment 
   getSinglePayment({params}, res) {
      Payment.findOne({
         _id: params._id
      })
      .then(dbPaymentData => {
         if (!dbPaymentData) {
            res.status(404).json({ message: 'No payment found with this id!'});
            return;
         }

         res.json(dbPaymentData)
      })
      .catch(err => {
         console.log(err)
         res.status(500).json(err)
      })
   },

   // delete payment
   deletePayment({params}, res) {
      Payment.findOneAndDelete({
         _id: params._id
      })
      .then(dbPaymentData => {
         if (!dbPaymentData) {
            res.status(404).json({ message: 'No payment found with this id!'});
            return;
         }

         res.json(dbPaymentData)
      })
      .catch(err => {
         console.log(err)
         res.status(500).json(err)
      })
   }
};

module.exports = paymentController