const router = require('express').Router();
const apiRoutes = require('./api');

//Pushes the exported router from index.js in api folder to be used
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

//Exports route to main program
module.exports = router;
