const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

//logic for /api/thoughts, get route and post route delivery
router.route('/').get(getThoughts).post(createThought);

// /api/students/:studentId UPDATE TO THOUGHTS
router.route('/:studentId').get(getSingleThought).delete(deleteThought);

module.exports = router;
