const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ"
class authentication {
	async auth(req,res){
		let st_authorization = String(req.headers.authorization).split(' ')[1];
		let [email, password] = Buffer.from(st_authorization, 'base64').toString('utf-8').split(':');
		if(email != undefined){
			let user = await User.view(email);
				bcrypt.compare(password, user.password, function(err, isMatch){
					if(!isMatch)
						return res.status(401).end();
					jwt.sign({name: user.name, email: user.email}, jwtSecret,{expiresIn: 3600}, (err,token) =>{
					if(err)
						return res.status(400).end();
					res.set("TOKEN",token);
					return res.status(204).end();
				})
			})
		}
	}
}
module.exports = new authentication();