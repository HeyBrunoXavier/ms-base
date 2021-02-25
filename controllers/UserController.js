const User = require("../models/User");
const bcrypt = require("bcrypt");
class UserController{
  /**
   * @method list
   * @description Listagem de usuários
   * @param {*} request
   * @param {*} response
   */
	async list(request, response){
		let o_user = await User.list();
		return response.json(o_user).status(200).end();
	}
  /**
   * @method insert
   * @description Inserção de um novo usuário
   * @param {*} request
   * @param {*} response
   */
	async insert(request,response){
		try{
			let user = request.body;
			if(!user.name)
				return response.status(400);
			if(!user.email)
				return response.status(400);
			if(!user.password)
				return response.status(400);
			user.password = bcrypt.hashSync(user.password,10);
			let o_user = await User.insert(user);
			if(o_user.constraint == 'users_email_unique')
				return response.status(406).end('Registered User');
			if(o_user.constraint == 'users_people_foreign')
				return response.status(406).end('People ID not found');
			return response.json(o_user).status(200).end();
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}
  /**
   * @method findById
   * @description Visualização de um usuário por ID
   * @param {*} request
   * @param {*} response
   */
	async findById(request,response){
		let st_id = request.params.id;
		if(!st_id)
			return response.status(400).end();
		let o_user = await User.findByID(st_id);
		if(!o_user)
			return response.status(404).json({err: "Usuário não existente!"}).end();
		return response.json(o_user).status(200).end();
	}

  /**
   * @method findByEmail
   * @description Visualização de um usuário por Email
   * @param {*} request
   * @param {*} response
   */
	async findByEmail(request,response){
		let st_email = request.params.email;
		if(!st_email)
			return response.status(400).end();
		let o_user = await User.findByEmail(st_email);
		if(!o_user)
			return response.status(404).json({err: "Usuário não existente!"}).end();
		return response.json(o_user).status(200).end();
	}
}
module.exports = new UserController();