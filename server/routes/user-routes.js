const router = require('express').Router();

const { login, createUser, findAllUsers, findUserById, deleteUser } = require('../controllers.js/user-controller');

router 
   .route('/')
   .get(findAllUsers)
   .post(createUser)

router 
   .route('/dashboard/:userId')
   .get(findUserById)
   .delete(deleteUser)

router 
   .route('/login')
   .post(login)

module.exports = router;