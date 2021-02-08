const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class authentication {
	async auth(req,res){
		try{
			let st_authorization = String(req.headers.authorization).split(' ')[1];
			let [email, password] = Buffer.from(st_authorization, 'base64').toString('utf-8').split(':');
			if(!email || !password)
				return res.status(400).end();
			let user = await User.findByEmail(email);
			if(!user)
				return res.status(404).end();
			let isMatch = bcrypt.compareSync(password, user.password);
			if(isMatch){
				let o_user = {
					"id": user.id,
					"name": user.name,
					"email": user.email
				}
				let token = jwt.sign(o_user, process.env.SECRET, {expiresIn:3600})
				res.set('X-TOKEN', token);
				return res.status(204).end();
			}
			return res.status(404).end('Invalid Email or Password');
		}catch (error){
			console.error(error);
			return res.status(400).end();
		}
	}
}
module.exports = new authentication();
