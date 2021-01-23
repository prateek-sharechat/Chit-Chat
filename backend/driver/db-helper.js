
const {MongoClient} = require('mongodb');
const Users = require('../models/user');
const constants = require('../util/constants')

class MongoBot {
	constructor() {
		this.client = new MongoClient(constants.URL, { useNewUrlParser: true });
	}
	async init() {
		await this.client.connect();
		console.log('connected');
		this.db = this.client.db(constants.DATABASE);
		this.Users = new Users(this.db);
	}
}

module.exports = new MongoBot();
