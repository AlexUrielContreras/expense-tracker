const { Schema, model } = require('mongooes');

const paymentSchema = new Schema({
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

const Payment = model('Payment', paymentSchema);

module.export = Payment