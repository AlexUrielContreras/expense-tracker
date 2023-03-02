const { User, Payment }  = require('../schemas/index');

const userController = {
   
   login(req, res) {
      // login code
   },

   createUser({ body }, res) {
      User.create(body)
      .then(dbUserData => {
         res.json(dbUserData)
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   findAllUsers(req, res) {
      User.find()
         .select('-__v')
         .then(dbUserData => {
            res.json(dbUserData)
         })
         .catch(err => {
            console.log(err)
            res.status(500)
         })
   },

   findUserById({ params }, res) {
      User.findById({
         _id: params.userId
      })
      .select('-__v')
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No user with found with that Id'});
            return
         }

         res.json(dbUserData)
      })
      .catch(err => {
         console.log(err);
         res.status(500);
      })
   },

   deleteUser({ params }, res) {
      User.findByIdAndDelete({
         _id: params.userId
      })
      .then(({payments}) => {
         return Payment.deleteMany({
            _id: payments
         })
      })
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that Id'});
            return
         }

         res.json({ message: 'User has been deleted '})
      }) 
      .catch(err => {
         console.log(err);
         res.status(500)
      })
   }
};

module.exports = userController