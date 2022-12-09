const router = require('express').Router();

const userRoutes = require('./user-routes');
const paymentRoutes = require('./payment-routes');

router.use('/users', userRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;