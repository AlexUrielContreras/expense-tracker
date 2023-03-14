const { Payment, User } = require('../schemas/index');

const paymentController = {

   createPayment({ body, user }, res) {
      Payment.create({
         userId: user.id,
         category: body.category,
         paymentAmount: body.paymentAmount,
         paymentDate: Date.now()
      })
      .then(({ _id }) => {
         return User.findByIdAndUpdate(
            { _id: user.id },
            { $push : {payments: _id }},
            { new: true}
         )
         .select('-__v -password')
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

   findPaymentById({params} , res) {
      Payment.findById({ _id: params.paymentId })
      .select('-__v')
      .then(dbPaymentData => {
         if (!dbPaymentData) {
            res.status(404).json({ message: 'No Payment Found '});
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
      .select('-__v')
      .then(dbPaymentData => {
         res.json(dbPaymentData)
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   findAllUserPayment({ user, query }, res) {
      Payment.find({
         userId: user.id
      })
      .limit(query.limit)
      .sort({ paymentDate: -1})
      .then(dbPaymentData => {
         if (!dbPaymentData) {
            res.status(404).json({ message: 'Payments not found'});
            return
         }

         res.json(dbPaymentData)
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      }) 
   },

   updatePayment({ params, body }, res) {
      Payment.findByIdAndUpdate(
         { _id: params.paymentId },
         body,
         { new: true }
         )
      .then(dbPaymentData => {
         if (!dbPaymentData) {
            res.status(404).json({ message: 'No Payment Found' });
            return
         }

         res.json({ dbPaymentData, message: 'Payment has been updated'})
      })
      .catch(err => {
         console.log(err)
         res.status(500).json(err)
      })
   },

   deletePayments({ params, user }, res) {
      Payment.findByIdAndDelete({ _id: params.paymentId})
      .then(({ _id }) => {
         return User.findByIdAndUpdate(
            { _id: user.id },
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