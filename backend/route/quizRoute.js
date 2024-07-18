const express = require('express');
const quizController = require('../controller/quizController')
const {protect, admin} = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(protect, quizController.getAllQuiz)
router.route('/:id').delete(protect, admin, quizController.deleteQuiz).get(protect, admin,quizController.getQuizById).patch(protect, admin,quizController.updateQuiz)
router.route('/add-quiz').post(protect, admin,quizController.addQuiz)

module.exports = router;
