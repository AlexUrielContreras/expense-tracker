const router = require('express').Router();
const { createUser, getAllUsers, getSingleUser, deleteUser, login } = require('../../controllers/user-controller');

router
   .route('/')
   .post(createUser)
   .get(getAllUsers)
   
   
router
   .route('/:_id')
   .get(getSingleUser)
   .delete(deleteUser)

router 
   .route('/login')
   .post(login)
   
   module.exports = router