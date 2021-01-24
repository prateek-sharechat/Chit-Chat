const container = require('./di');
const server = require('./server');
const bodyParser = require("body-parser")
const mongo = require('../backend/driver/db-helper')

server(container).then(async (app) => {
	const config = container.resolve('serverConfig');
	const mongo = container.resolve('dbHelper');
	await mongo.init();
	const { port, keepAliveTimeout } = config;
	if (!port) {
		console.log('Port not found, Please check server-config.js');
		return;
	}

	// Binds to a port
	const finalApp = app.listen(port, () => {
		finalApp.keepAliveTimeout = keepAliveTimeout;
		finalApp.on('close', () => {
			// Do something like close db connection
		});
		console.log(`Server started successfully, running on port: ${finalApp.address().port}.`);
	});
});
