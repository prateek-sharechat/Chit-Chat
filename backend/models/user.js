class User {
	constructor(db) {
		this.collection = db.collection('user');
	}

	async signup(user) {
		const newUser = await this.collection.insertOne(user);
		return newUser.insertedId;
	}

	async login(userName, password) {
		const user = await this.collection.findOne({ userName: userName, password: password });
		return user;
	}
}

module.exports = User;
