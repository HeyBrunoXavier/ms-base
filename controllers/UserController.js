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
			if(!user) return response.status(403).send("Bad request!");
			user.password = bcrypt.hashSync(user.password,10);
			let o_user = await User.insert(user);
			if(o_user.constraint == 'users_email_unique') return response.status(406).end('Registered User');
			if(o_user.constraint == 'users_people_foreign') return response.status(406).end('People ID not found');
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
		let id = request.params.id;
		if(!id) return response.status(403).send("Id does not exist!");
		let o_user = await User.findByID(id);
		if(!o_user) return response.status(404).json({err: "User does not exis!"}).end();
		return response.json(o_user).status(200).end();
	}

  /**
   * @method findByEmail
   * @description Visualização de um usuário por Email
   * @param {*} request
   * @param {*} response
   */
	async findByEmail(request,response){
		let email = request.params.email;
		if(!email) return response.status(400).send("Email does not exist!");
		let o_user = await User.findByEmail(email);
		if(!o_user) return response.status(404).json({err: "User does not exist!"}).end();
		return response.json(o_user).status(200).end();
	}
}
module.exports = new UserController();