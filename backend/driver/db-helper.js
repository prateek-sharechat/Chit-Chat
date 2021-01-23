
const {MongoClient} = require('mongodb');
const Users = require('../models/user');

class MongoBot {
	constructor() {
		const url = 'mongodb+srv://Patrick:Patrick@3112@cluster0.bkaqw.gcp.mongodb.net/vipra?retryWrites=true';
		this.client = new MongoClient(url, { useNewUrlParser: true });
	}
	async init() {
		await this.client.connect();
		console.log('connected');
		this.db = this.client.db('vipra');
		this.Users = new Users(this.db);
	}
}

module.exports = new MongoBot();
