const router = require('express').Router();
const userRoute = require('../controllers/userController');

router.post('/register', userRoute.createUser);
router.post('/login', userRoute.login);

module.exports = router;