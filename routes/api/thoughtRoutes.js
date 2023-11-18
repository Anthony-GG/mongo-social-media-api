const router = requre('express').Router();


//logic for /api/thoughts, get route and post route delivery
router.route('/').get(getThoughts).post(createThought);


module.exports = router;