const container = require('./di');
const server = require('./server');

server(container).then((app) => {
	const config = container.resolve('serverConfig');

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
