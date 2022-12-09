const { Payment } = require('../models');


const paymentController = {
   
   // create payment 
   createPayment({body}, res) {
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
   }
   // lookup one payment 


   // delete payment
};

module.exports = paymentController