const router = require('express').Router();

const { login, createUser, findAllUsers, findUserById, deleteUser } = require('../controllers.js/user-controller');

router 
   .route('/')
   .get(findAllUsers)
   .post(login)
   .post(createUser)

router 
   .route('/u/dashboard/:userId')
   .get(findUserById)
   .delete(deleteUser)

module.exports = router;