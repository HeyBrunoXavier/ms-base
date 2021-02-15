const Role = require("../models/Roles");
class RoleController{

	async list(req, res){
		let o_role = await Role.list();
		return res.json(o_role).status(200).end();
	}
	async insert(req,res){
		try{
			let role = req.body;
			if(!role.id)
				return res.status(400).end("id role field is empty");
        if(!role.action)
				return res.status(400).end("action field is empty");
			if(!role.user_id)
				return res.status(400).end("id user field is empty");
			let o_role = await Role.insert(role);
			if(o_role.constraint == 'roles_pkey')
				return res.status(406).end("Ação já permitida ao usuário");
			return res.json(o_role).status(200).end();
		}
		catch(error){
			console.error(error)
			return res.status(400).end();
		}
	}
}
module.exports = new RoleController();