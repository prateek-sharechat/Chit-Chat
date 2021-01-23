const {
	createContainer,
	asValue,
	asClass,
	Lifetime,
	InjectionMode
} = require('awilix');


const serverConfig = require('../config/server-config');
const dbHelper = require('../driver/db-helper');
const modals = require('../models');

// Logics

// Apis
const signupAPI = require('../api/signup');
const loginAPI = require('../api/login');


// SETUP DEPENDENCY INJECTION CONTAINER.
// YOU CAN USE container.resolve('<DEPENDENCY-NAME>')
const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
const getScope = () => {
	return {
		lifetime: Lifetime.SINGLETON
	};
};

container.register({
	//------------------ MIDDLEWARE --------------------
	serverConfig: asValue(serverConfig),
	// Database
	dbHelper: asValue(dbHelper),
	// Schemas
	User: asValue(modals.User),

});

//----------------- HELPER -----------------------------

//------------------ REPOSITORY ------------------------
// Create repositories after creating container. As they needs middleware and utils.




// ------------------ LOGIC ----------------------


//------------------ API -------------------------------
container.register('signupAPI', asClass(signupAPI, getScope()));
container.register('loginAPI', asClass(loginAPI, getScope()));
// Create API at end.


module.exports = container;
