const router = require('express').Router();
const { createUser, getAllUsers } = require('../../controllers/user-controller');

router
   .route('/')
   .post(createUser)
   .get(getAllUsers)

module.exports = router