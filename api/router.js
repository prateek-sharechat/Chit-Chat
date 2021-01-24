const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
	req.container.resolve('signupAPI').handleRequest(req, res);
});

router.get('/login', (req, res) => {
	req.container.resolve('loginAPI').handleRequest(req, res);
});

router.get('/health', (req, res) => {
	res.status(200).send('Hello From Chit-Chat Service!');
});
module.exports = router;
