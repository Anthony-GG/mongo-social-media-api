const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

//logic for /api/thoughts, GET route and POST route delivery
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtID
router.route('/:thoughtID').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;
