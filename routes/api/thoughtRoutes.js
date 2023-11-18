const router = require('express').Router();
const {
  getStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  addAssignment,
  removeAssignment,
} = require('../../controllers/studentController');

//logic for /api/thoughts, get route and post route delivery
router.route('/').get(getThoughts).post(createThought);

// /api/students/:studentId UPDATE TO THOUGHTS
router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments UPDATE TO THOUGHTS
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId UPDATE TO THOUGHTS
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
