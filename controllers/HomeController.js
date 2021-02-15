const User = require("../models/User");
const bcrypt = require("bcrypt");
class HomeController{
	async list(req, res){
		let o_user = await User.list();
		return res.json(o_user).status(200).end();
	}

	async insert(req,res){
		try{
			let user = req.body;
			if(!user.name)
				return res.status(400);
			if(!user.email)
				return res.status(400);
			if(!user.password)
				return res.status(400);
			user.password = bcrypt.hashSync(user.password,10);
			let o_user = await User.insert(user);
			if(o_user.constraint == 'users_email_unique')
				return res.status(406).end('Registered User')
			return res.json(o_user).status(200).end();
		}
		catch(error){
			console.error(error)
			return res.status(400).end();
		}
	}
	async findById(req,res){
		let st_id = req.params.id;
		if(!st_id)
			return res.status(400).end();
		let o_user = await User.findByID(st_id);
		if(!o_user)
			return res.status(404).json({err: "Usuário não existente!"}).end();
		return res.json(o_user).status(200).end();
	}

	async findByEmail(req,res){
		let st_email = req.params.email;
		if(!st_email)
			return res.status(400).end();
		let o_user = await User.findByEmail(st_email);
		if(!o_user)
			return res.status(404).json({err: "Usuário não existente!"}).end();
		return res.json(o_user).status(200).end();
	}
}
module.exports = new HomeController();