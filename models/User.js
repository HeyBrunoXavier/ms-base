const knex = require('../database/connection');
class User{
  /**
   * @method list
   * @author HeyBrunoXavier
   */
	async list(){
		try {
			var o_user = await knex.select("*").from("users");
			if(o_user.length > 0){
				delete o_user[0].password;
				return o_user;
			}
		}catch (erro) {
			console.log(erro);
			return false;
		}
	}
	/**
	 * @method insert
	 * @param {*} user
	 * @author HeyBrunoXavier
	 */
	async insert(user){
		try{
			let o_user = await knex('users').insert(user)
			return o_user = {
				"id": user.id,
				"name": user.name,
				"email": user.email,
				"people": user.people,
				"hash": user.hash
			}
		}catch(error){
			console.error(error);
			return error
		}
	}
	/**
	 * @method findByID
	 * @param {*} id
	 * @author HeyBrunoXavier
	 */
	async findByID(id){
		try{
			let o_user = await knex("users").where({id}).first();
			if(o_user){
				delete o_user.password;
				return o_user;
			}
		}catch(error){
			console.error(error);
			return undefined;
		}
	}
	/**
	 * @method findByEmail
	 * @param {*} email
	 * @author HeyBrunoXavier
	 */
	async findByEmail(email){
		try{
			let o_user = await knex("users").where({email}).first();
			if(o_user){
				return o_user;
			}
		}catch(error){
			console.error(error);
			return undefined;
		}
	}
}
module.exports = new User();
