
class LogIn {

	constructor(dbHelper, helper, constants) {
		this.Users = dbHelper.Users;
		this.helper = helper;
		this.constants = constants;
	}

	/**
	 * Handles request and response
	 * @param {*} req request object
	 * @param {*} res response object
	 * @returns {Promise<*>}
	 */
	async handleRequest(req, res) {
		const userName = req.query.userName;
		const password = req.query.password;
		try{
			const user = await this.Users.login(userName);
			const dbPassword = this.helper.decryptWithAES(user.password, this.constants.PASSPHASE);
			if (dbPassword === password ){
				return this.helper.writeResponse(null, { statusCode: 200, response: {  access: 'yes', userId: user._id }  }, res);
			}else {
				return this.helper.writeResponse(null, { statusCode: 400, response: { access: 'no', message: 'Incorrect Credentials!, try again!' } }, res);
			}
		}catch (error) {
			return this.helper.writeResponse(error, { errorCode: error.code,  response: { access: 'no'} }, res);
		}
	}
}

module.exports = LogIn;
