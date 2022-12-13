const { Payment, User } = require('../models');


const paymentController = {
   
   // create payment 
   createPayment({ body, params }, res) {
      Payment.create(body)
      .then(({ _id })=> {
         return User.findOneAndUpdate(
            { _id: params.userId},
            { $push : {pastPayments: _id}},
            { new: true}
         )
         .select('-password -__v')
      })
      .then(dbPaymentData => {
         if (!dbPaymentData) {
            res.status(404).json({ message: 'No User found with that id'})
         }
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
      .select('-__v')
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
      .select('-__v')
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

   // update payment info
   updatePayment({params, body}, res) {
      Payment.findOneAndUpdate(
         { _id: params._id},
         body ,
         { new: true, runValidators: true }
      )
      .then(dbPaymentData => {
         if (!dbPaymentData) {
            res.status(404).json({ message: 'No Payment was found with this id!'});
            return
         }

         res.json(dbPaymentData)
      })
      .catch(err => {
         console.log(err);
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