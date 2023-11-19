const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

//logic for /api/users, GET route and POST route delivery
router.route('/').get(getUsers).post(createUser);

// /api/users/:userID, GET2, PUT and DELETE route delivery
router
  .route('/:userID')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  // /api/users/:userID/friends/:friendID PUT and DELETE route delivery
  router.route('/:userID/friends/:friendID').put(addFriend).delete(deleteFriend);

module.exports = router;
