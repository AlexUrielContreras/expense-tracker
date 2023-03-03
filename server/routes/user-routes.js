const router = require('express').Router();

const { login, createUser, findAllUsers, findUserById, deleteUser } = require('../controllers.js/user-controller');
const { authenticateToken } = require('../utills/auth');

router 
   .route('/')
   .get(findAllUsers)
   .post(createUser)

router 
   .route('/dashboard')
   .get(authenticateToken, findUserById)
   .delete(authenticateToken, deleteUser)

router 
   .route('/login')
   .post(login)

module.exports = router;