const express = require('express');
const quizController = require('../controller/quizController')
const router = express.Router()

router.route('/').get(quizController.getAllQuiz)
router.route('/:id').delete(quizController.deleteQuiz).get(quizController.getQuizById).patch(quizController.updateQuiz)
router.route('/add-quiz').post(quizController.addQuiz)

module.exports = router;
