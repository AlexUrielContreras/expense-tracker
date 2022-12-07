const router = require('express').Router();
const { createUser, getAllUsers, getSingleUser } = require('../../controllers/user-controller');

router
   .route('/')
   .post(createUser)
   .get(getAllUsers)
   
   
router
   .route('/:_id')
   .get(getSingleUser)
   
   module.exports = router