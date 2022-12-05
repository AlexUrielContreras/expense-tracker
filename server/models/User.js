const { Schema, model } = require('mongoose');

const userSchema = new Schema({
   firstName: {
      type: String, 
      required: true,
      trim: true
   },

   lastName: {
      type: String,
      required: true,
      trim: true
   },

   email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
   }, 

   password: {
      type: String,
      required: true,
      minLength: 5
   }
});

const User = model('User', userSchema);

module.exports = User;