const router = require('express').Router();

const { checkToken } = require('../helpers/middleware');


router.use('/products', checkToken, require('./api/products'));
router.use('/users', require('./api/users'));


module.exports = router;
