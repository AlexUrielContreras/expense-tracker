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

         const isPasswordValid = dbUserData.checkPassword(body.password);

         if (!isPasswordValid) {

            // if (dbUserData.failedLoginAttempts === 5 && dbUserData.failedLoginAttemptsDate.getMinutes() + 1 >= new Date(Date.now()).getMinutes()) {
            //    session.save((err) => {
            //       if (err) {
            //          res.status(500).json(err);
            //       }
   
            //       session.userId = dbUserData._id;
            //       session.firstName = dbUserData.firstName;
            //       session.lastName = dbUserData.lastName;
            //       session.isLoggedIn = true;
   
            //       res.json({ user: dbUserData,  message: 'You are now logged in !!!'});
   
            //       return User.findByIdAndUpdate(
            //          { _id: dbUserData._id},
            //          { $set: { failedLoginAttempts: 0 }},
            //          { new: true}
            //       );
            //    });
            // }

            if (dbUserData.failedLoginAttempts === 5) {
               res.status(400).json({ message: 'To many login attempts. Please try again later'});

               return;
            }

            res.status(400).json({ message: 'Incorrect Email or Password. Please try again'})

            return User.findByIdAndUpdate(
               { _id: dbUserData._id},
               { $inc: { failedLoginAttempts: 1} , $set: { failedLoginAttemptsDate: Date.now() }},
               { new: true}
            )

         } else {

            if (dbUserData.failedLoginAttempts === 5) {
               console.log(dbUserData.failedLoginAttemptsDate.getMinutes() + 1)
               console.log(new Date(Date.now()).getMinutes())

               if (dbUserData.failedLoginAttemptsDate.getMinutes() < new Date(Date.now()).getMinutes()) {

                  console.log('is this being ran');
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

         }

         // if (dbUserData.failedLoginAttempts === 5 && !isPasswordValid ) {
         //    res.status(500).json({ message: 'To Many Login attempts. Please try again later'});

         //    if (dbUserData.failedLoginAttemptsDate.getMinutes() + 1 < new Date(Date.now()).getMinutes()) {
         //       return User.findByIdAndUpdate(
         //          { _id: dbUserData._id },
         //          { $set: { failedLoginAttempts: 0 }},
         //          { new: true }
         //       )
         //    }

         //    return
         // };

         
         // if (!isPasswordValid) {
         //    res.status(400).json({ message: 'Incorrect Email or Password. Please try again'});

         //    return User.findByIdAndUpdate(
         //       { _id: dbUserData._id},
         //       { 
         //          $inc: { failedLoginAttempts: 1 },
         //          $set: { failedLoginAttemptsDate: Date.now() }
         //       },
         //       { new: true}
         //    )
         // };

         // session.save((err) => {
         //    if (err) {
         //       res.status(500).json(err);
         //    }

         //    session.userId = dbUserData._id;
         //    session.firstName = dbUserData.firstName;
         //    session.lastName = dbUserData.lastName;
         //    session.isLoggedIn = true;

         //    res.json({ user: dbUserData,  message: 'You are now logged in !!!'});

         //    return User.findByIdAndUpdate(
         //       { _id: dbUserData._id},
         //       { $set: { failedLoginAttempts: 0 }},
         //       { new: true}
         //    );
         // });

      })
   }
}

module.exports = userController;