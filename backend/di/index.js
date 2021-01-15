const {
	createContainer,
	asValue,
	asClass,
	Lifetime,
	InjectionMode
} = require('awilix');


const serverConfig = require('../config/server-config');


// Logics

// Apis
const signupAPI = require('../api/signup');


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

});

//----------------- HELPER -----------------------------

//------------------ REPOSITORY ------------------------
// Create repositories after creating container. As they needs middleware and utils.




// ------------------ LOGIC ----------------------


//------------------ API -------------------------------
// Create API at end.


module.exports = container;
