const router = require('express').Router();
router.use(require('./taskRoute'));
router.use(require('./userRoute'));

module.exports = router;