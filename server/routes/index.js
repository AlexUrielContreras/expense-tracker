const router = require('express').Router();

const userRoutes = require('./user-routes');
const paymentRoutes = require('./payment-routes');

router.use('/api/user', userRoutes);
router.use('/api/payment', paymentRoutes);

module.exports = router;