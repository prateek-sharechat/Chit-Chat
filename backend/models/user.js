class User {
	constructor(db) {
		this.collection = db.collection('user');
	}

	async signup(user) {
		const alreadyExist = await this.collection.findOne({ userName: user.userName });
		if(alreadyExist){
			console.log('userName already exists, try with another UserName');
			return null;
		}
		const newUser = await this.collection.insertOne(user);
		return newUser.insertedId;
	}

	async login(userName, password) {
		const user = await this.collection.findOne({ userName: userName });
		return user;
	}
}

module.exports = User;
