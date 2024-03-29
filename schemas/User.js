const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

   payments: [{
      type: Schema.Types.ObjectId,
      ref: 'Payment'
   }],

   /*       5 Failed login attempts will lock the user out          */

   loginAttempts: {
      type: Number,
      default: 0
   },

   lastLoginAttempt: {
      type: Date,
      default: Date.now()
   }

}, 
{
   toJSON: {
      virtuals: true
   },
   id: false
}
);

userSchema.pre('save' , async function() {
   if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds)
   }
})

userSchema.methods.checkPassword = async function(userPw) {
   return await bcrypt.compare(userPw, this.password);
}

userSchema.methods.failedLogin = async function() {
   return await model('User').findByIdAndUpdate(
      { _id: this._id},
      { 
         $inc: { loginAttempts: 1 },
         $set: { lastLoginAttempt: Date.now() }
      }
   )
}

userSchema.methods.successfulLogin = async function() {
   return await model('User').findByIdAndUpdate(
      { _id: this._id },
      {
         $set: { loginAttempts: 0, lastLoginAttempt: Date.now()},
      }
   )
}

const User = model('User', userSchema);

module.exports = User;