const express = require('express');
const userController = require('../controller/userController')
const router = express.Router()

router.route('/login').post(userController.authUser)
router.route('/register').post(userController.registerUser)
router.route('/logout').post(userController.logoutUser)


module.exports = router;
