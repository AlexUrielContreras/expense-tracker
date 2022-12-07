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

   // FOR DEVELOPMENT ONLY 
   // get all users 
   getAllUsers(req, res) {
      User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   
   // FOR DEVELOPMENT ONLY 
   // get single user
   getSingleUser({params}, res) {
      User.findOne({
            _id: params._id
      })
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

   }

}


module.exports = userController;