const { Schema, model } = require('mongoose');

const PaymentSchema = new Schema({
   category: {
      type: String,
      required: true
   },

   amount: {
      type: Number, 
      required: true
   },

   paymentDate: {
      type: Date,
      default: Date.now()
   }
});

const Payment = model('Payment', PaymentSchema);

module.exports = Payment