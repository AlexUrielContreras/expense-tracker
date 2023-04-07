const router = require('express').Router();

const userRoutes = require('./user-routes');
const paymentRoutes = require('./payment-routes');

router.use('/api/users', userRoutes);
router.use('/api/payments', paymentRoutes);

module.exports = router;