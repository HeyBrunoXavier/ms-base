const Role = require("../models/Roles");
class RoleController{
  /**
   * @method list
   * @description Listagem dos papeis
   * @param {*} request
   * @param {*} response
   */
	async list(request, response){
		let o_role = await Role.list();
		return response.json(o_role).status(200).end();
	}

  /**
   * @method insert
   * @description Inserção de um novo papel
   * @param {*} request
   * @param {*} response
   */
	async insert(request,response){
		try{
			let role = request.body;
			if(!role.id)
				return response.status(400).end("id role field is empty");
			if(!role.action)
				return response.status(400).end("action field is empty");
			if(!role.user_id)
				return response.status(400).end("id user field is empty");
			let o_role = await Role.insert(role);
			if(o_role.constraint == 'roles_pkey')
				return response.status(406).end("Ação já permitida ao usuário");
			return response.json(o_role).status(200).end();
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}
}
module.exports = new RoleController();