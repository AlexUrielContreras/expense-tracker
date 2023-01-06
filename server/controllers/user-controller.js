const { User, Payment } = require('../models');

const userController = {
   // Create User 
   createUser({body, session}, res) {
      User.create(body)
      .then(dbUserData => {
   
         session.save((err) => {
            if (err) {
               res.status(500).json(err)
            };
            
            session.userId = dbUserData._id
            session.firstName = dbUserData.firstName,
            session.lastName = dbUserData.lastName
            session.isLoggedIn = true

            res.json(dbUserData);

         })

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
      .populate({
         path: 'pastPayments',
         select: '-_id category amount'
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
      User.findOne({
         _id: params._id
      })
      .then(({ pastPayments }) => {
         return Payment.deleteMany({
            _id: pastPayments
         })
      })
      .then(() => {
         return User.findByIdAndDelete({
            _id: params._id
         })
      })
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id'});
            return
         };

         res.json(dbUserData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
   },

   // Login 
   login({body, session}, res) {
      User.findOne({
         email: body.email
      })
      .then(dbUserData => {

         if (!dbUserData) {
            res.status(404).json({ message: 'Could not find user. Please try again'})
            return
         };

         const {failedLoginAttempts, failedLoginAttemptsDate} = dbUserData;
         const elapsedTime = new Date(Date.now()) - failedLoginAttemptsDate

         const isPasswordValid = dbUserData.checkPassword(body.password);

         if (!isPasswordValid) {

            if (failedLoginAttempts !== 0 && failedLoginAttempts % 5 === 0) {

               if (elapsedTime >= 600000) {
                  res.status(400).json({ message: 'Incorrect Email or Password. Please try again'});

                  return User.findByIdAndUpdate(
                     { _id: dbUserData._id},
                     { $inc: { failedLoginAttempts: 1} , $set: { failedLoginAttemptsDate: Date.now() }},
                     { new: true}
                     );
                  }
                  
                  res.status(400).json({ message: 'To many login attempts. Please try again later'});
                  return;
            }

            res.status(400).json({ message: 'Incorrect Email or Password. Please try again'});

            return User.findByIdAndUpdate(
               { _id: dbUserData._id},
               { $inc: { failedLoginAttempts: 1} , $set: { failedLoginAttemptsDate: Date.now() }},
               { new: true}
            )
         } else {

            if (failedLoginAttempts % 5 === 0 && failedLoginAttempts !== 0) {

               if (elapsedTime >= 600000) {

                  session.save((err) => {
                     if (err) {
                        res.status(500).json(err);
                     }
      
                     session.userId = dbUserData._id;
                     session.firstName = dbUserData.firstName;
                     session.lastName = dbUserData.lastName;
                     session.isLoggedIn = true;
      
                     res.json({ user: dbUserData,  message: 'You are now logged in !!!'});
      
                  });   

                  return User.findByIdAndUpdate(
                     { _id: dbUserData._id},
                     { $set: { failedLoginAttempts: 0 }},
                     { new: true}
                  );
               }

               res.status(400).json({ message: 'To many login attempts. Please try again later'})
               return;
            } 

            session.save((err) => {
               if (err) {
                  res.status(500).json(err);
               }

               session.userId = dbUserData._id;
               session.firstName = dbUserData.firstName;
               session.lastName = dbUserData.lastName;
               session.isLoggedIn = true;

               res.json({ user: dbUserData,  message: 'You are now logged in !!!'});

               return User.findByIdAndUpdate(
                  { _id: dbUserData._id},
                  { $set: { failedLoginAttempts: 0 }},
                  { new: true}
               );
            });
         };
      });
   }
}

module.exports = userController;