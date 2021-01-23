
class SignUp {

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
		const input = { ...req.body };
		const password = this.helper.encryptWithAES(input.password, this.constants.PASSPHASE)
		const user = {
			"userName": input.userName,
			"email": input.email,
			"password": password,
			"phoneNumber": input.phoneNumber,
			"status": input.status
		}
		try{
			const insertId = await this.Users.signup(user);
			if(insertId){
				return this.helper.writeResponse(null, { statusCode: 200, response: { userId: insertId, userName: user.userName } }, res)
			}else {
				return this.helper.writeResponse(null, { statusCode: 400, response: { message: 'userName already exists!, try with another userName' } }, res)
			}
		}catch (error) {
			return this.helper.writeResponse(error, { errorCode: error.code}, res);
		}
	}
}

module.exports = SignUp;
