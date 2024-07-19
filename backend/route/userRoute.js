const express = require('express');
const userController = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/login').post(userController.authUser)
router.route('/register').post(userController.registerUser)
router.route('/logout').post(userController.logoutUser)
router.route('/score').post( userController.saveScore)
router.route('/score/:id').get( protect, userController.getScore)


module.exports = router;
