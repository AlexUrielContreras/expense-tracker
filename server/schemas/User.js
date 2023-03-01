const { Schema, model } = require('mongoose');

const userSchema = new Schema({
   
   firstName: {
      type: String,
      trim: true,
      required: true
   },

   email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match:[ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ]
   },

   password: {
      type: String,
      trim: true,
      required: true,
      minLength: 6
   },

   budgetAmount: {
      type: Number,
      trim: true
   },

   payments: {
      type: mongoose.ObjectID,
      ref: 'Payment'
   },

   /*       5 Failed login attempts will lock the user out          */

   loginAttempts: {
      type: Number,
      default: 0
   },

   lastLoginAttempt: {
      type: Date,
      default: Date.now()
   }

});

const User = model('User', userSchema);

module.exports = User;