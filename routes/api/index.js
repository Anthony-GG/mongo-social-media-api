//Requires the use of express package's router for pathing
const router = require('express').Router();

//Requires the userRoutes and thoughtRoutes files
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//Points to both the user and thoughts for pathing sake
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

//Exports router to overall program
module.exports = router;
