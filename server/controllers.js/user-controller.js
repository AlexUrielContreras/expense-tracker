const { User, Payment }  = require('../schemas/index');
const { signToken } = require('../utills/auth');

const userController = {
   
   login({ body }, res) {
      User.findOne({ email: body.email})
      .then(async dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'Incorrect Credentials' });
            return
         };

         const isPwValid = await dbUserData.checkPassword(body.password);
         const { loginAttempts, lastLoginAttempt } = dbUserData;

         const currentTime = Date.now();
         const elapsedTime = currentTime - lastLoginAttempt.getTime();

         if (!isPwValid) {

            if (loginAttempts === 0 || loginAttempts % 5 !== 0) {
               await dbUserData.failedLogin();
               return res.status(400).json({ message: 'Incorrect Credentials' });
            }
            
            if (elapsedTime >= 300000) {
               await dbUserData.failedLogin();
               return res.status(400).json({ message: 'Incorrect Credentials' });
            }

            res.status(400).json({ message: 'To many login attempts. Try again later'});
         } else {

            if (loginAttempts === 0 || loginAttempts % 5 !== 0 || elapsedTime >= 300000) {
               const payload = {
                  id: dbUserData._id,
                  firstName: dbUserData.firstName,
                  email: dbUserData.email
               }
      
               const token = signToken(payload)
               
               await dbUserData.successfulLogin();
               res.json({user: dbUserData, token, message: 'You are now logged in!'});
               return
            }

            res.status(400).json({ message: 'To many login attempts. Try again later'});
            return
         }
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   createUser({ body }, res) {
      User.create(body)
      .then(dbUserData => {
         const payload = {
            id: dbUserData._id,
            firstName: dbUserData.firstName,
            email: dbUserData.email
         }

         const token = signToken(payload);

         res.json({ user: dbUserData, token})
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   findAllUsers(req, res) {
      User.find()
         .select('-__v -password')
         .then(dbUserData => {
            res.json(dbUserData)
         })
         .catch(err => {
            console.log(err)
            res.status(500)
         })
   },

   findUserById({ user }, res) {
      User.findById({
         _id: user.id
      })
      .select('-__v -password')
      .populate('payments', '-__v')
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No User Found'});
            return
         }

         res.json(dbUserData)
      })
      .catch(err => {
         console.log(err);
         res.status(500);
      })
   },

   deleteUser({ user }, res) {
      User.findByIdAndDelete({
         _id: user.id
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

         res.json({ message: 'User and associated Payments have been deleted '})
      }) 
      .catch(err => {
         console.log(err);
         res.status(500)
      })
   }
};

module.exports = userController