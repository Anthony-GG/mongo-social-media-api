const router = require('express').Router();
const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/userController.js');

//logic for /api/users, get route and post route delivery
router.route('/').get(getUser).post(createUser);

// /api/courses/:courseId NEED TO UPDATE TO USER
router
  .route('/:courseId')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
