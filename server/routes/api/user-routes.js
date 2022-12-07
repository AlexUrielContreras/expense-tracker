const router = require('express').Router();
const { createUser, getAllUsers, getSingleUser, deleteUser } = require('../../controllers/user-controller');

router
   .route('/')
   .post(createUser)
   .get(getAllUsers)
   
   
router
   .route('/:_id')
   .get(getSingleUser)
   .delete(deleteUser)
   
   module.exports = router