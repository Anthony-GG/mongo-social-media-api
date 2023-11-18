const router = requre('express').Router();


//logic for /api/users, get route and post route delivery
router.route('/').get(getUser).post(createUser);


module.exports = router;