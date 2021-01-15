const express = require('express');
const bodyParser = require('body-parser');
const router = require('./api/router.js');


const server = (container) => {
	return new Promise((resolve) => {
		// Requires config

		// Creates a new Express application
		const app = express();



		// Parses application/octet-stream
		app.use(bodyParser.raw());

		//cors

		// Parses application/x-www-form-urlencoded
		app.use(
			bodyParser.urlencoded({
				extended: true
			})
		);

		// Parses application/json
		app.use(
			bodyParser.json({
				limit: '10mb',
				strict: false
			})
		);


		app.use((err, req, res, next) => {
			return res.status(500).send(`Something went wrong!, err: ${err}`);
		});

		app.use((req, res, next) => {
			req.container = container.createScope();
			next();
		});

		app.get('/health', (req, res) => {
			res.status(200).send('Hello From Chit-Chat Service!');
		});

		app.use('/', router);

		return resolve(app);
	});
};

module.exports = server;
