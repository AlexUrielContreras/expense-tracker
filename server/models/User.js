const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
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
},
{
   toJSON: {
      virtuals: true,
   },
   
   // virtials return a id that is === to the userSchema _id 
   // we disable that with this option
   id: false

   
});

// set up pre-saver middleware to create password
UserSchema.pre('save', async function(next) {
   if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      try {
         this.password = await bcrypt.hash(this.password, saltRounds)
      } catch (error){
         console.error(error)
      }
   }

   next();
})

const User = model('User', UserSchema);

module.exports = User;