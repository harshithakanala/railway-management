const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../user/controller');
const { validateRegisterUser, validateLoginUser } = require('../user/validator');


router.post('/register', validateRegisterUser, registerUser);
router.post('/login', validateLoginUser, loginUser);

module.exports = router;
