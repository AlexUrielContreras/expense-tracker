const { Schema, model } = require('mongoose');

const userSchema = new Schema({
   firstName: {
      type: String, 
      required: true,
   },

   lastName: {
      type: String,
      required: true
   },

   email: {
      type: String,
      required: true,
      unquie: true,
      match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
   }, 

   password: {
      type: String,
      required: true,
      minLength: 5
   }
});

const User = model('user', userSchema);

module.exports = User;