const AES = require('crypto-js/aes');
const Utf8 = require('crypto-js/enc-utf8');

class Helper {

	encryptWithAES(text, passphrase){
		return AES.encrypt(text, passphrase).toString();
	};

	decryptWithAES (ciphertext, passphrase){
		const bytes = AES.decrypt(ciphertext, passphrase);
		const originalText = bytes.toString(Utf8);
		return originalText;
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

module.exports = Helper;
