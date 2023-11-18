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

// /api/users/:userID NEED TO UPDATE TO USER
router
  .route('/:userID')
  .get(getSingleUser)
  .delete(deleteUser);

module.exports = router;
