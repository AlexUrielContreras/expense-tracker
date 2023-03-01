const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({

   category: {
      type: String,
      required: true,
      enum: ['Rent', 'Utility Bills', 'Food', 'Shopping', 'Subscription', 'Travel', 'Entertainment']
   },

   paymentAmount: {
      type: Schema.Types.Decimal128,
      trim: true,
      required: true
   },

   paymentData: {
      type: Date,
      default: Date.now()
   }
});

const Payment = model('Payment', paymentSchema);