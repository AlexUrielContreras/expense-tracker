const router = require('express').Router();

const { login, createUser, findAllUsers, findUserById, updateUser, deleteUser } = require('../controllers.js/user-controller');
const { authenticateToken } = require('../utills/auth');

router 
   .route('/')
   .get(findAllUsers)
   .post(createUser)

router 
   .route('/dashboard')
   .get(authenticateToken, findUserById)
   .delete(authenticateToken, deleteUser)
   .put(authenticateToken, updateUser)

router 
   .route('/login')
   .post(login)

module.exports = router;