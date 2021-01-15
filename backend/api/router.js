const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
	req.container.resolve('signupAPI').handleRequest(req, res);
});

router.get('/', (req, res) => {
	res.status(200).send('Check the health at /health');
});
module.exports = router;
