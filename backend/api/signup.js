
class SignUp {

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
		const input = { ...req.body };
		const user = {
			"userName": input.userName,
			"email": input.email,
			"password": input.password,
			"phoneNumber": input.phoneNumber,
			"status": input.status
		}
		try{
			const insertId = await this.Users.signup(user);
			return this.writeResponse(null, { statusCode: 200, response: { userId: insertId, userName: user.userName } }, res);
		}catch (error) {
			return this.writeResponse(error, { errorCode: error.code}, res);
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

module.exports = SignUp;
