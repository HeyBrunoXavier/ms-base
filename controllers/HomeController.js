const User = require("../models/User");
class HomeController{
 
	async list(req, res){
		let o_user = await User.list();
		return res.json(o_user).status(200).end();
	}

	async insert(req,res){
		try{
			let {name,email,password} = req.body;
			if(!name)
				return res.status(404).end();
			if(!email)
				return res.status(404).end();
			if(!password)
				return res.status(404).end();
			
			let emailExist = await User.view(email);
			if(emailExist)
				return res.status(406).json({err: "O E-mail já está cadastrado!"})
			
			let o_user = await User.insert(name,email,password);
			res.json(o_user).status(200).end();
		}
		catch(o_error){
			console.log(o_error)
			return res.status(400).end();
		}
	}

	async view(req,res){
		let st_email = req.params.email;
		let o_user = await User.view(st_email);
		if(!o_user)
			return res.status(404).json({err: "Usuário não existente!"}).end();
		return res.json(o_user).status(200).end();
	}
}
module.exports = new HomeController();