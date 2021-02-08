const knex = require('../database/connection');
class User{
	async list(){
		try {
			var o_response = await knex.select("*").from("users");
			if(o_response.length > 0){
				delete o_response[0].password;
				return o_response;
			}
		}catch (erro) {
			console.log(erro);
			return false;
		}
	}
	async insert(user){
		try{
			let o_response = await knex('users').insert(user)
			return o_response = {
				"name": user.name,
				"email": user.email,
			}
		}catch(error){
			console.error(error);
			return error
		}
	}
	async findByID(id){
		try{
			let o_response = await knex("users").where({id:id}).first();
				if(o_response){
					delete o_response.password;
					return o_response;
				}
		}catch(error){
			console.error(error);
			return undefined;
		}
	}
	async findByEmail(email){
		try{
			let o_response = await knex("users").where({email:email}).first();
				if(o_response){
					return o_response;
				}
		}catch(error){
			console.error(error);
			return undefined;
		}
	}
}
module.exports = new User();
