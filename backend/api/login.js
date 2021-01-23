
class LogIn {

	constructor(dbHelper) {
		this.Users = dbHelper.Users;
	}

	/**
	 * Handles request and response
	 * @param {*} req request object
	 * @param {*} res response object
	 * @returns {Promise<*>}
	 */
	async handleRequest(req, res) {
		const userName = req.body.userName;
		const password = req.body.password;
		try{
			const user = await this.Users.login(userName, password);
			return this.writeResponse(null, { statusCode: 200, response: {  access: 'yes', userId: user._id }  }, res);
		}catch (error) {
			return this.writeResponse(error, { errorCode: error.code,  response: { access: 'no'} }, res);
		}
	}

	writeResponse(err, data, res) {
		if (err) {
			res.status(err.code ? err.code : 400);
			return res.send(err);
		}
		res.status(200);
		return res.json(data);
	}
}

module.exports = LogIn;
