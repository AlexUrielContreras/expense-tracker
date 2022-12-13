const { User } = require('../models');

const userController = {
   // Create User 
   createUser({body}, res) {
      User.create(body)
      .then(dbUserData => {
         res.json(dbUserData);
      }).catch(err => {
         console.log(err);
         res.status(400).json(err)
      })
   },

   // FOR DEVELOPMENT ONLY 
   // get all users 
   getAllUsers(req, res) {
      User.find({})
      .select('-password -__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   // get single user
   getSingleUser({params}, res) {
      User.findOne({
            _id: params._id
      })
      .select('-password -__v')
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No Users with that id were found. Please enter a valid _id'});
            return
         }

         res.json(dbUserData)
      })
      .catch(err => {
         console.log(err)
         res.status(500).json(err)
      })

   },

   // delete user
   deleteUser({params}, res) {
      User.findByIdAndDelete({
         _id: params._id
      })
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id'});
            return
         }

         res.json(dbUserData)
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   }

}


module.exports = userController;