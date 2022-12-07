const { User } = require('../models');

const userController = {
   // Create User 
   createUser({body}, res) {
      console.log(body)
      User.create(body)
      .then(dbUserData => {
         res.json(dbUserData);
      }).catch(err => {
         console.log(err);
         res.status(400).json(err)
      })
   },

   // Get all Users 
   getAllUsers(req, res) {
      User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
         console.log(err);
      })
   }

}


module.exports = userController;