const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  // updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

//logic for /api/users, get route and post route delivery
router.route('/').get(getUsers).post(createUser);

// /api/courses/:courseId NEED TO UPDATE TO USER
router
  .route('/:courseId')
  .get(getSingleUser)
  // .put(updateCourse)
  .delete(deleteUser);

module.exports = router;
