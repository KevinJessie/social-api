// dependencies
const router = require('express').Router();
const userRoutes = require('./userroutes');
const thoughtRoutes = require('./thoughtroutes');

// add prefix of `/thoughts` to routes created in `thought-routes.js`
router.use('/thought', thoughtRoutes);
// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);

module.exports = router;