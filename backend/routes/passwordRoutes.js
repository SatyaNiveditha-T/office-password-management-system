const router = require('express').Router();
const { getPasswordsByUser, getPasswordCountByUser, createPassword } = require('../controllers/passwordController');

router.get('/user/:userId', getPasswordsByUser);
router.get('/user/:userId/count', getPasswordCountByUser);
router.post('/', createPassword);

module.exports = router;

