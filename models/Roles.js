const knex = require('../database/connection');
class Roles{
	async list(){
		try {
			var o_response = await knex.select("*").from("roles");
			if(o_response.length > 0){
				return o_response;
			}
		}catch (erro) {
			console.log(erro);
			return false;
		}
	}
	async insert(role){
		try{
			let o_response = await knex('roles').insert(role)
			return o_response = {
				"role": role.id,
				"description": role.description,
				"action": role.action,
				"user": role.user_id
			}
		}catch(error){
			console.error(error);
			return error
		}
	}
}
module.exports = new Roles();
