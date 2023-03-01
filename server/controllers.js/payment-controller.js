const { Payment, User } = require('../schemas/index');

const paymentController = {

   createPayment({ body, params }, res) {
      Payment.create(body)
      .then(({ _id }) => {
         return User.findByIdAndUpdate(
            { _id: params.userId },
            { $push : {paymets: _id }},
            { new: true}
         )
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No User found with that Id '});
               return
            }

            res.json(dbUserData)
         })
      })
      .catch(err => {
         console.log(err)
         res.status(500).json(err)
      })
   },

   findById({params} , res) {
      Payment.findById({ _id: params.paymentId })
      .then(dbPaymentData => {
         if (!dbPaymentData) {
            res.status(404).json({ message: 'No User found with that Id '});
            return
         }

         res.json(dbPaymentData)
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   findAllPayments(req, res) {
      Payment.find()
      .then(dbPaymentData => {
         res.json(dbPaymentData)
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   deletePayments({ params }, res) {
      Payment.findByIdAndDelete({ _id: params.paymentId})
      .then(({ _id }) => {
         return User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: {payments: _id }},
            { new: true}
         )
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with that id'});
               return 
            }

            res.json({ message: 'Payment has been successfully deleted'})
         })
         .catch(err => {
            console.log(err);
            res.status(500).json(err)
         })
      })
   }
};


module.exports = paymentController;